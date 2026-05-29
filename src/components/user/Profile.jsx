function Profile() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div>
      <h1>Profile</h1>

      <p>Name: {user?.name}</p>

      <p>Role: {user?.role}</p>
    </div>
  );
}

export default Profile;
