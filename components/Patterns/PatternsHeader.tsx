"use client"
import { useLang } from "@/context/LangContext";
import { NestedDictionary } from "@/lib/interfaces";


export default function DashboardHeader(){
   const { dict } = useLang();
   const dictPatternDashboard = dict.patternDashboard as NestedDictionary

  return(<>{dictPatternDashboard.allPatterns as string}{" "}</>)
}
