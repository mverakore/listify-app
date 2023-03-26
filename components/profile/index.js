import styled from "styled-components";
import { useRouter } from "next/router";
import { useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react"

const ImgProfile = styled.img`
    height: 5rem;
    width: 5rem;
    border-radius: 50%;
    positon: relative;
`
const SignOutPopUp = styled.div`
    position: absolute;
    top: 100px;
    right: 16px;
    background-color: #1a1a1a;
    color: white;
    padding: 1rem;
    border-radius: 0.5rem;
    cursor: pointer;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    display: flex;
`
const StyledInfo = styled.p`
    margin: 0.5rem;  
    padding: 0;
    font-size: 1rem;
    font-weight: 400;
    color: white;
`

export function Profile() {

    const router = useRouter()

    const { data: session } = useSession()

    const navigation = [
        { name: 'New', href: '/home', current: router.pathname === '/home' },
    ]

const [showPopUp, setShowPopUp] = useState(false)

    if (!session) {
        return (
            <>
                <ImgProfile
                    navigation={navigation}
                    user={session?.user}
                    onClick={() => signIn()}
                    src='/profile.svg' ></ImgProfile>
            </>
        )
    }

    return (
        <>
            <ImgProfile
                navigation={navigation}
                user={session?.user}
                src={session.user.image} ></ImgProfile>
        </>
    )
}


