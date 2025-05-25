import type { Metadata } from "next"; 

//Componente importado
import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";
import Link from "next/link";

export const metadata : Metadata = {
    title: "CashTrackr - Olvidé contraseña",
    description: "CashTrackr - Iniciar Sesion"
}

export default function ForgotPasswordPage() {

    return (
        <>
            <h1 className="font-black text-6xl text-purple-950">¿Olvidaste tu contraseña?</h1>
            <p className="text-3xl font-bold">Aqui puedes <span className="text-amber-500">restablecerla</span></p>

            <ForgotPasswordForm/>

            <nav className="mt-10 flex flex-col space-y-4">
                <Link 
                    href={'/auth/login'}
                    className="text-center text-gray-500"
                >
                    ¿Ya tienes cuenta? Inicia Sesion
                </Link>
                
                <Link 
                    href={'/auth/register'}
                    className="text-center text-gray-500"
                >
                    ¿No tienes cuenta? Crea una
                </Link>
            </nav>
        </>
    );
}