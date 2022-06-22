export default async function fetchData(
  setData,
  route,
  user,
  communities,
  skills,
  interests,
  refresh,
  setRefresh = null
) {
  // changes the array to a suitable form to be
  function formatArray(arr) {
    return "'" + arr.toString().replaceAll(",", "','") + "'";
  }

  function formatUrl() {
    // local host
    // return `http://127.0.0.1:8000/api/${route}/?format=json&searchInput=${
    //   !user.search ? "" : user.search
    // }&communities=${formatArray(communities)}&skills=${formatArray(
    //   skills
    // )}&interests=${formatArray(interests)}`;

    // Heroku https://murmuring-basin-78610.herokuapp.com/

    return `http://127.0.0.1:8000/api/${route}/?format=json&searchInput=${
      !user.search ? "" : user.search
    }&communities=${formatArray(communities)}&skills=${formatArray(
      skills
    )}&interests=${formatArray(interests)}`;
  }

  async function fetchUser() {
    console.log(formatUrl());
    try {
      await fetch(formatUrl(), {
        headers: {
          Authorization: "4e9f4c0735a434e094da78c61faa290881016460",
        },
      })
        .then((a) => a.json())
        .then((data) => setData(data))
        .then(() => (setRefresh ? setRefresh(!refresh) : void 0));
    } catch (e) {
      console.log(e);
    }
    // finally {
    //   console.log("Done!");
    // }
  }
  fetchUser();
}
