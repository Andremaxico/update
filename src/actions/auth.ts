'use server'

import { supabaseClient } from "@/utils/supabase/client";
import { createClient } from "@/utils/supabase/server"
import { Provider, User } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const signOutAction = async () => {
    const supabase = await createClient();

    const { error } = await supabase.auth.signOut();

    return { errorMessage: error ? 'Some error occured' : null }
}

export const authWithOAuthAction = async (provider: Provider) => {
    const supabase = await createClient();

    console.log('redirect url', `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/callback`)

    //TODO:
    //fix github signin

    try {
        const { error, data } = await supabase.auth.signInWithOAuth({
            'provider': provider,
            options: {
                // TODO: optimize this to handle dev and prod mode
                redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/callback`,
            },
        });

        if(error) throw new Error('Something went wrong');
        
        return { errorMessage: null, url: data.url }
    } catch(error) {
        return { errorMessage: 'Error logging in' }
    }
}

export async function signInAction(formData: FormData) {
    const supabase = await createClient();

    // type-casting here for convenience
    // in practice, you should validate your inputs
    const data = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
    }

    const { error } = await supabase.auth.signInWithPassword(data)

    if (error) {
        redirect('/error')
    }

    revalidatePath('/', 'layout')
    redirect('/')
}

export async function signUpAction(formData: FormData) {

  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    options: {
        emailRedirectTo: process.env.NEXT_PUBLIC_BASE_URL,
    }
  }

  const { error } = await supabase.auth.signUp(data)

  if (error) {
    console.log('error', error)
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/confirm-email')
}

export const getUserAction = async (): Promise<User | null> => {
    const supabase = await createClient();

    const data = await supabase.auth.getUser();
    const user = data.data.user;

    console.log('action data', data);

    return user;
}