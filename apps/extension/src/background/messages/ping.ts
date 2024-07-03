import { createClient } from "@supabase/supabase-js"

import type { PlasmoMessaging } from "@plasmohq/messaging"
import { Storage } from "@plasmohq/storage"

const storage = new Storage()

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  console.log("entrando to the moon")

  const session = await storage.get("lattter-session")
  const sessionParsed = session && session !== "not_auth" && JSON.parse(session)

  const supabase = createClient(
    process.env.PLASMO_PUBLIC_SUPABASE_URL,
    process.env.PLASMO_PUBLIC_SUPABASE_KEY
  )

  if (req.body === "not_auth") {
    await storage.set("lattter-session", "not_auth")

    res.send({
      message: "not_auth"
    })
  }

  let tokens = req?.body

  if (!sessionParsed?.access_token && tokens) {
    const {
      data: { session, user },
      error
    } = await supabase.auth.setSession({
      access_token: tokens.access_token,
      refresh_token: tokens.refresh_token
    })

    if (session) {
      await storage.set("lattter-session", JSON.stringify({ ...session, user }))

      res.send({
        message: "success"
      })
    } else {
      await storage.set("lattter-session", "not_auth")
      res.send({
        message: "not_auth"
      })
    }
  } else {
    const {
      data: { user },
      error
    } = await supabase.auth.getUser(sessionParsed?.access_token ?? "")

    if (error) {
      const refreshSession = await fetch(
        `${
          process.env.PLASMO_PUBLIC_URL?.includes("localhost")
            ? "http://localhost:3000"
            : "https://www.lattter.com"
        }/services/refreshToken`,
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            Authorization: sessionParsed?.refresh_token
          }
        }
      )

      console.log("refreshing", refreshSession)

      if (!refreshSession.ok) {
        console.log("Error refreshing session")
        await storage.set("lattter-session", "not_auth")
        res.send({
          message: "not_auth"
        })
      }
      const session = await refreshSession.json()
      console.log("refreshing", session)

      if (session) {
        await storage.set("lattter-session", JSON.stringify(session))
      }
      res.send({
        message: "success"
      })
    }

    console.log("has session")

    res.send({
      message: "success"
    })
  }

  res.send({
    message: "success"
  })
}

export default handler
