'use client'

import { Check, Play } from 'lucide-react'
import Image from 'next/image'
import React, { useState } from 'react'

export const WatchDemo = () => {
    const [watchDemo, setWatchDemo] = useState(false)
    const [videoModal, setVideoModal] = useState(false)

    return (
        <div className="my-20 flex flex-col items-center justify-center gap-8">
            <div className="w-full relative shadow-lg rounded-lg overflow-hidden">
                <Image
                    alt=""
                    src={'/videoCover.png'}
                    width={800}
                    height={100}
                    className={`hover:blur-lg transition-all ${watchDemo ? 'blur-lg' : ''}`}
                    onMouseEnter={() => setWatchDemo(true)}
                    onMouseLeave={() => setWatchDemo(false)}
                />
                {watchDemo && (
                    <div
                        onMouseEnter={() => setWatchDemo(true)}
                        onMouseLeave={() => setWatchDemo(false)}
                        onClick={() => setVideoModal(true)}
                        className="absolute transition-all left-0 top-0 z-10 w-full h-full items-center justify-center p-4"
                    >
                        <div className="flex flex-col cursor-pointer gap-2 h-full items-center justify-center">
                            <p className="flex flex-row gap-2 items-center hover:opacity-60">
                                Watch the demo
                                <Play width={16} height={16} />
                            </p>
                        </div>
                    </div>
                )}
                {videoModal && (
                    <div className="w-full z-50 h-full left-0 top-0 absolute">
                        <video width="100%" height="100%" controls autoPlay>
                            <source src="lattter.mp4" type="video/mp4" />
                            Tu navegador no soporta la etiqueta de video.
                        </video>
                    </div>
                )}
            </div>
            <div className="flex flex-col gap-4">
                <div className="flex flex-row gap-2">
                    <Check color="#B6B6B6" />
                    <p>
                        Bookmark widget on X and LinkedIn & save link support on
                        all platforms.
                    </p>
                </div>
                <div className="flex flex-row gap-2">
                    <Check color="#B6B6B6" />

                    <p>AI-based link categorization.</p>
                </div>
                <div className="flex flex-row gap-2">
                    <Check color="#B6B6B6" />

                    <p>Categorized email reports and reminders.</p>
                </div>
                <div className="flex flex-row gap-2">
                    <Check color="#B6B6B6" />

                    <p>Social media digest, based on your interests.</p>
                </div>
            </div>
        </div>
    )
}
