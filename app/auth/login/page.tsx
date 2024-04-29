export default function signIn() {
    return (
      <div>
        <form action="">
          <label htmlFor="email">Email</label>
          <input type="text" name="email" id="email" placeholder="Enter Email" />
  
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter Password"
          />
        </form>
      </div>
    );
  }
  