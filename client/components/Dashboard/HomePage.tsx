"use client";
import React, { useEffect } from "react";
import CardDataStats from "../CardDataStats";
import withAuth from "@/app/WithAuth";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { callGet } from "@/redux/userSlice";
import RecommendationCard from "./Card";

const HomePage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { userData } = useSelector((state: any) => state.user);
  
  useEffect(() => {
    const headers = {
      "Content-Type": "application/json",
    };
    dispatch(callGet({ header:headers, endpoint:"recommendations"}));
  }, [])
  
  return (
    <>

      <div className="">
        {userData?.map((data:any,i:number)=>(
        <RecommendationCard data={data} i={i}/>
        ))}
      </div>
    </>
  );
};

export default withAuth(HomePage);
