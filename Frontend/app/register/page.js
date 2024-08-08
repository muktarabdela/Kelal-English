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
                <div className="flex items-center my-6">
                    <div className="flex-grow border-t border-neutral-300"></div>
                    <span className="mx-2 text-sm"></span>
                    <div className="flex-grow border-t border-neutral-300"></div>
                </div>
                <div className="mt-4 text-center text-sm">
                    {showRegister ? (
                        <>
                            Already have an account?{" "}
                            <a onClick={() => dispatch(toggleAuthForm())} className=" cursor-pointer text-sm text-primary">
                                Sign in
                            </a>
                        </>
                    ) : (
                        <>
                            Don't have an account?{" "}
                            <a onClick={() => dispatch(toggleAuthForm())} className="text-sm text-primary cursor-pointer">
                                Create account
                            </a>
                        </>
                    )}
                </div>
            </div>
        </div>

    );
}
