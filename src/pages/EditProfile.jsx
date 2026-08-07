import { useState } from "react";
import { show, update } from "../services/user";
import { useParams, useNavigate } from "react-router";


const EditProfile = () => {
     const { userId } = useParams()
     const navigate = useNavigate()
}