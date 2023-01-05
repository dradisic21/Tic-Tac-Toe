import axios from "axios";



export async function registers(username, password) {
  const requestOptions = {
    headers: { "Content-Type": "application/json" }
  };
  const response = await axios
    .post("https://tictactoe.aboutdream.io/register/", 
    JSON.stringify({ username, password }),
    requestOptions)
    .catch(function (error) {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      }
      throw error;
    });
  //const data = response;
  return response;
}

export async function login(username, password) {
  const requestOptions = {
    headers: { "Content-Type": "application/json" },
  };
  const response = await axios
    .post(
      "https://tictactoe.aboutdream.io/login/",
      JSON.stringify({ username: username, password: password }),
      requestOptions
    )
    .catch(function (error) {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      }
      throw error;
    });
  //console.log(response);
  //const data = await response.json();
  //console.log(response);
  localStorage.setItem("userToken", response.data.token);    // prvo trebao userToken pa sam kasnije vidio da mi treba user -> nisam pocistio kod
  localStorage.setItem("user", JSON.stringify(response.data)); //sve se tu na kraju sprema (token, username, id )
  return response;
}
export async function getGames(limit, currentPage) {
  const params = {limit: limit, offset: (currentPage -1) * limit}
  const requestOptions = {
    method: "GET",  //visak jer sam prvo koristio fetch pa sam kasnije koristio axios
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("userToken"),
    },
    params: params
  };
  return axios.get("https://tictactoe.aboutdream.io/games/", requestOptions);
  // fetch('https://tictactoe.aboutdream.io/games/', requestOptions)
  //     .then(response => response.json())
  //     .then(data => console.log(data));
}


export async function getUsers(limit, currentPage) {
  const params = {limit: limit, offset: (currentPage -1) * limit}
  const requestOptions = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("userToken"),
    },
    params: params
  };
  return axios.get("https://tictactoe.aboutdream.io/users/", requestOptions);
}


export async function getGame(id) {
  const user = JSON.parse(localStorage.getItem("user"));
  const userToken = JSON.parse(localStorage.getItem("user")).token;
  //console.log(userToken + id);
  const requestOptions = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + userToken,
    },

  };
  return axios.get(
    `https://tictactoe.aboutdream.io/games/${id}`,
    requestOptions
  );
  }

  export async function createNewGame() {
    const requestOptions = {
      headers: { "Content-Type": "application/json", Authorization: "Bearer " + localStorage.getItem("userToken")}
    };
    const response = await axios
      .post("https://tictactoe.aboutdream.io/games/", 
       null, requestOptions)
      .catch(function (error) {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
        throw error;
      });
    return response;
  };
