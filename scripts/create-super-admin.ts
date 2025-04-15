
import { supabase } from "@/integrations/supabase/client";

const createSuperAdmin = async () => {
  try {
    // First check if the user already exists
    const { data: existingUser } = await supabase.auth.admin.listUsers();
    const userExists = existingUser?.users.some(user => 
      user.email === "114.adrian.gheorghe@gmail.com"
    );

    if (userExists) {
      console.log('Super admin account already exists. Skipping creation.');
      return;
    }

    // Create the super admin account
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
      email: "114.adrian.gheorghe@gmail.com",
      password: "Alfasiomega!!!",
      options: {
        data: {
          role: 'admin'
        },
        emailRedirectTo: window.location.origin
      }
    });

    if (signUpError) {
      throw signUpError;
    }

    // If the user was created successfully, confirm their email automatically
    // This bypasses email verification in development
    if (signUpData?.user) {
      console.log('Super admin account created successfully:', signUpData.user.email);
      console.log('Important: You may need to disable email confirmation in Supabase dashboard for immediate login access.');
    }

  } catch (error) {
    console.error('Error creating super admin:', error);
  }
};

createSuperAdmin();
