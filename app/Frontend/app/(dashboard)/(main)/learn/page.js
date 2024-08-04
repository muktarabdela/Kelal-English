"use client";
import { useLayoutEffect } from 'react';
import Phases from '@/components/Phases'
import { redirect } from 'next/navigation';
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';

const page = () => {
    return (
        <div className="flex flex-row-reverse gap-[48px] px-6">
            <Phases />
        </div>
    )
}

export default page