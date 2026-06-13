import axios from "axios";


function Logout() {
  const handleLogout = async () => {
    try {
      const confirmed = window.confirm('Are you sure you want to logout?');
      if (confirmed) {
        const response = await axios.post('http://localhost:3000/api/user/logout', {}, {
          headers: {
            'authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        console.log(response.data);
        // Clear the token from localStorage
        localStorage.removeItem('token');
        // Redirect to the login page or any other page
        // window.location.href = '/login';
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Axios error occurred while logging out:', error.response?.data || error.message);
      } else {
        console.error('An unexpected error occurred while logging out:', error);
      }
    }
  };
  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  )

}

export default Logout