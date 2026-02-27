"use client"

import { useQuery } from "@tanstack/react-query"
import { getMedicalRecords } from "../api/medical.records.api"

export function useMedicalRecords() {
    return useQuery({
        queryKey: ["medical"],
        queryFn: getMedicalRecords,
    })
    
}