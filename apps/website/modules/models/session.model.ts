interface AppMetadata {
  provider: string;
  providers: string[];
}

interface UserMetadata {
  avatar_url: string;
  email: string;
  email_verified: boolean;
  full_name: string;
  iss: string;
  name: string;
  phone_verified: boolean;
  picture: string;
  provider_id: string;
  sub: string;
}

interface Identity {
  // Definir la estructura del objeto identity si es necesario
  [key: string]: any; // Esto permite cualquier clave adicional
}

export interface ISupabaseSession {
  app_metadata: AppMetadata;
  aud: string;
  confirmed_at: string;
  created_at: string;
  email: string;
  email_confirmed_at: string;
  id: string;
  identities: Identity[];
  is_anonymous: boolean;
  last_sign_in_at: string;
  phone: string;
  role: string;
  updated_at: string;
  user_metadata: UserMetadata;
}
