'use client'
import Image from "next/image"
import InteractionCard from "./InteractiveCard";
import { useRouter } from "next/navigation";
import { useCompanies } from "@/app/api/companies";
import { useCallback, useEffect, useState } from "react";
import { useSession } from "next-auth/react";

interface Props {
    imgSrc: string;
    companyName: string;
}

export default function Card({companyJson, isAdmin}: {companyJson: CompanyResponseBody | null, isAdmin: boolean}) {
    const router = useRouter();

    const { deleteCompany } = useCompanies();
    const [ x, setX ] = useState<number>(0)

    const { data: session } = useSession();
    const token: string = session?.user.token ?? "";

    const removeCompany = useCallback(async (bid: string) => {
        await deleteCompany(bid, token)
        setX(1 - x)
    } , [])
    useEffect(() => {
        
    }, [x])



    return companyJson ? (
        <InteractionCard contentName={companyJson?.name}>
            <div className="img w-[100%] h-[70%] relative object-cover">
                <Image src={companyJson?.picture}
                    alt='cover'
                    fill={true}
                    loader={({src}) => src}
                    />
            </div>
            <h1 className="font-medium text-gray-950 px-3">
                <strong>{companyJson.name}</strong>
            </h1>
            <h1 className="font-medium text-gray-950 px-3">
                business: {companyJson.business}
            </h1>
            <h1 className="font-medium text-gray-950 px-3">
                tel: {companyJson.tel}
            </h1>
            <div className="flex flex-row">
                <button className="block rounded-md bg-blue-600 hover:bg-cyan-700 w-1/4 mx-3 my-2 px-3 py-1 shadow-lg"
                onClick={(e) => {e.stopPropagation(); router.push(`/company/${companyJson.id}`) }}>
                    more
                </button>
                { isAdmin && (
                    <button className="block rounded-md bg-red-600 hover:bg-cyan-700 w-1/4 mx-3 my-2 px-3 py-1 shadow-lg"
                onClick={(e) => {e.stopPropagation();  removeCompany(companyJson.id)}}>
                    Remove
                </button>
                ) }
                { isAdmin && (
                <button className="block rounded-md bg-sky-600 hover:bg-cyan-700 w-1/4 mx-3 my-2 px-3 py-1 shadow-lg"
                onClick={(e) => {e.stopPropagation();  router.push(`/company/${companyJson.id}/edit/`)}}>
                    Edit
                </button> )
                }
            </div>
        </InteractionCard>
    ) : (
        <div></div>
    )
}