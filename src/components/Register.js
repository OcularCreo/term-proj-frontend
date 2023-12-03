import { Container } from 'react-bootstrap';

const register = () =>{
    return (
        <>
            <Container className="vh-100 container-xl" style={{backgroundColor: 'blue', height: "500px"}}>
                <div className="row align-items-center justify-content-center">
                    <div className="col col-lg-6 col-md-8 col-sm-10">
                        <div className="card w-100" style={{height: "70%"}}>
                            <div className="card-body">
                                <Container>
                                    <div className="row justify-content-center">
                                        <h1 className="text-center">REGISTER</h1>
                                    </div>
                                    <form>
                                        <div className="form-group mt-3">
                                            <label htmlFor="UsernameInput">Username</label>
                                            <input type="text" className="form-control" id="UsernameInput" placeholder="Username" required/>
                                        </div>
                                        <div className="form-group mt-3">
                                            <label htmlFor="PasswordInput">Password</label>
                                            <input type="password" className="form-control" id="PasswordInput" placeholder="Password" required/>
                                        </div>
                                        <div className="form-group mt-3">
                                            <label htmlFor="RePasswordInput">Re-Password</label>
                                            <input type="password" className="form-control" id="RePasswordInput" placeholder="Re-Enter Password" required/>
                                        </div>
                                        <button className="btn btn-success rounded-12 mt-4" style={{width: "100%"}} type="submit">Register</button>
                                    </form>
                                    <div className="row mt-4 justify-content-center">
                                        <a className="mt-5 text-center" href="/">Login</a>
                                    </div>
                                </Container>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    );
}

export default register;