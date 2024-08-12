async function userProfile() {
    try {
        const res = await fetch('api/User');
        if (!res.ok) throw new Error('Network response was not ok');
        const user = await res.json();


        const users = document.getElementById('user-list');

        user.forEach(userProfile => {
            const li = document.createElement('li');
            li.textContent = `${userProfile.userID}: ${userProfile.power}`;
            users.appendChild(li); 
        });
        
    } catch (error) {
        console.error('Error fetching items:', error);
    }
    
}
window.onload = userProfile;