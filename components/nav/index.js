import { useRouter } from 'next/router'
import { useSession, signIn, signOut } from "next-auth/react"
import styled from 'styled-components'
import { useState } from 'react'

const NavBg = styled.div`
    background-color: #1a1a1a;  
    height: fit-content;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    color: white;
    padding: 0.5rem 2rem;
`

const ImgProfile = styled.img`
    height: 4rem;
    width: 4rem;
    border-radius: 50%;
    margin-right: 4rem;
`

const NormalProfile = styled.img`
height: 5rem;
width: 5rem;
border-radius: 50%;
positon: relative;
`

const StyledInfo = styled.p`
    margin: 0.5rem;  
    padding: 0;
    font-size: 1rem;
    font-weight: 400;
    color: white;
`
const SignOutPopUp = styled.div`
    position: absolute;
    top: 100px;
    right: 16px;
    background-color: #1a1a1a;
    color: white;
    padding: 1rem;
    border-radius: 0.5rem;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    display: flex;
    z-index: 100;
`
const StyledLink = styled.a`
    color: white;
    text-decoration: none;
    `
const SignOutbttn = styled.button`
    background-color: #EB3535;
    color: white;
    border: none;
    border-radius: 10px;
    padding: 0.5rem 2rem; 
    cursor: pointer;
    font-size: 1rem;
    margin-top: 0.5rem;
&:hover {
    background-color: #B72323;
}
    `

const Logo = styled.h1`
    font-size: 2.5rem;
    font-weight: 700;
    margin: 0;
    padding: 0;
    font-family: 'Days One', sans-serif;
    `

export function NavBar() {

    const router = useRouter()

    const { data: session } = useSession()

    const navigation = [
        { name: 'New', href: '/home', current: router.pathname === '/home' },
    ]

    const [showPopUp, setShowPopUp] = useState(false)

    if (!session) {
        return (

            <NavBg>

                <div>
                    <StyledLink href='/home'>
                        <Logo>Listify</Logo>
                    </StyledLink>
                </div>

                <ImgProfile
                    navigation={navigation}
                    user={session?.user}
                    onClick={() => signIn()}
                    src='/whiteprofile.svg' ></ImgProfile>
            </NavBg>
        )
    }

    return (
        <>
            <NavBg>

                <div>
                    <StyledLink href='/home'>
                        <Logo>Listify</Logo>
                    </StyledLink>
                </div>

                <ImgProfile
                    navigation={navigation}
                    user={session?.user}
                    onClick={() => setShowPopUp(!showPopUp)}
                    src={session.user.image} ></ImgProfile>
                {/* <p>{session.user.name}</p> */}
                {showPopUp && <SignOutPopUp>
                    <NormalProfile src={session.user.image}></NormalProfile>
                    <StyledInfo>{session.user.name}</StyledInfo>
                    <StyledInfo>{session.user.email}</StyledInfo>
                    <SignOutbttn onClick={() => signOut()}>Sign Out</SignOutbttn>
                </SignOutPopUp>}

            </NavBg>
        </>
    )

}