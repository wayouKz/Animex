
  const Login = async () => {
    const session = await getServerSession(authOption)
    return (
    
      <div className="bg-warna-ajaib rounded ">

         <Link href="/api/auth/signin">Login</Link>
      </div>
    
    )

  }

  export default Login