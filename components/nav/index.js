import { useRouter } from 'next/router'
import { useSession, signIn, signOut } from "next-auth/react"
import styled from 'styled-components'

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

const StyledLink = styled.a`
    color: white;
    text-decoration: none;
    `

export function NavBar() {

    const router = useRouter()

    const { data: session } = useSession()

    const navigation = [
        { name: 'New', href: '/home', current: router.pathname === '/home' },
    ]

    if (!session) {
        return (

            <NavBg>

                <div>
                    <StyledLink href='/home'>
                        <h1>Listify</h1>
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
                    <h1>Listify</h1>
                </div>

                <ImgProfile
                    navigation={navigation}
                    user={session?.user}
                    onClick={() => router.push('/profile')}
                    src={session.user.image} ></ImgProfile>
                {/* <p>{session.user.name}</p> */}

            </NavBg>
        </>
    )

}