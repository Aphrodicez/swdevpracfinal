'use client'
import CompanyCatalog from "@/components/CompanyCatalog";
import { Suspense } from "react";
import { LinearProgress } from "@mui/material";
import SearchBar from "@/components/Searchbar";
import { useCallback, useEffect, useState } from "react";
import { useCompanies } from "@/app/api/companies";
import { useSession } from "next-auth/react";

export default function Companies() {
    const { getCompanies } = useCompanies();
    const [companyResponse, setCompanyResponse] = useState<CompaniesResponseBody | null>(null);

    const updateCompany = useCallback(async () => {
        const res = await getCompanies()
        // console.log(res)
        setCompanyResponse(res)
    } , [])
    useEffect(() => {
        updateCompany();
    }, [])
    const companies: CompaniesResponseBody | null = companyResponse;

    console.log("HAHA");
    console.log(companies)

    return (
        false ? (
            <div></div>
        ) : (
        <main>
            <Suspense fallback={<p>Loading...<LinearProgress/></p>}>
                <CompanyCatalog companiesJson={companies} isAdmin = {true}/>
            </Suspense>
        </main>
        )
    )
}