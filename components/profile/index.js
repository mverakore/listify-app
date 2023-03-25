import styled from "styled-components";
import { useRouter } from "next/router";
import { useSession, signIn, signOut } from "next-auth/react"

const ImgProfile = styled.img`
    height: 5rem;
    width: 5rem;
    border-radius: 50%;
`

export function Profile() {

    const router = useRouter()

    const { data: session } = useSession()

    const navigation = [
        { name: 'New', href: '/home', current: router.pathname === '/home' },
    ]



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
                onClick={() => router.push('/profile')}
                src={session.user.image} ></ImgProfile>
            {/* <p>{session.user.name}</p> */}
        </>
    )
}
