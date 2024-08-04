'use client';
import { useSelector, useDispatch } from 'react-redux';
import { toggleAuthForm } from '@/store/UiSlice';
import Login from "@/components/Login";
import Register from "@/components/Register";

export default function Auth() {
    const dispatch = useDispatch();
    const showRegister = useSelector(state => state.ui.showRegister);

    return (
        <div className='h-screen flex items-center justify-center'>
            <div >
                {showRegister ? (
                    <Register />
                ) : (
                    <Login />
                )}
                <div className="mt-4 text-center text-sm">
                    {showRegister ? (
                        <>
                            Already have an account?{" "}
                            <a onClick={() => dispatch(toggleAuthForm())} className="underline cursor-pointer">
                                Sign in
                            </a>
                        </>
                    ) : (
                        <>
                            Don't have an account?{" "}
                            <a onClick={() => dispatch(toggleAuthForm())} className="underline cursor-pointer">
                                Create account
                            </a>
                        </>
                    )}
                </div>
            </div>
        </div>

    );
}
