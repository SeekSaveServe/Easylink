// if selected skills,int, comm (either from user profile or actual search) empty, use all
// on Feed page search input should be empty - to get everything possible (and route is different)


export default async function fetchData(
  route,
  search,
  communities,
  skills,
  interests,
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

    // Digital Ocean: https://dolphin-app-aeqog.ondigitalocean.app/

    // const rootUrl = process.env.NODE_ENV == 'production' ? "https://murmuring-basin-78610.herokuapp.com"  
    //   : "http://127.0.0.1:8000";

    // const rootUrl = "https://dolphin-app-aeqog.ondigitalocean.app";
    const rootUrl = "http://127.0.0.1:8000";

    return `${rootUrl}/api/${route}/?format=json&searchInput=${
      !search ? "" : search
    }&communities=${formatArray(communities)}&skills=${formatArray(
      skills
    )}&interests=${formatArray(interests)}`;
  }

  async function fetchUser() {
    console.log(formatUrl());
    try {
      // await fetch(formatUrl(), {
      //   headers: {
      //     Authorization: "4e9f4c0735a434e094da78c61faa290881016460",
      //   },
      // })
      //   .then((a) => a.json())
      //   .then((data) => setData(data))
      //   .then(() => (setRefresh ? setRefresh(!refresh) : void 0));

      const res = await fetch(formatUrl(), {
        headers: {
          Authorization: "4e9f4c0735a434e094da78c61faa290881016460",
        },
      });

      const data = await res.json();
      console.log("Data from fetch and URL", data, formatUrl());

      return data;

      // setData(data);
      // setRefresh(setRefresh ? setRefresh(!refresh): void 0);


    } catch (e) {
      console.log(e);
    }
    // finally {
    //   console.log("Done!");
    // }
  }
  return fetchUser();
}




// export default async function fetchData(
//   setData,
//   route,
//   user,
//   communities,
//   skills,
//   interests,
//   refresh,
//   setRefresh = null
// ) {
//   // changes the array to a suitable form to be
//   function formatArray(arr) {
//     return "'" + arr.toString().replaceAll(",", "','") + "'";
//   }

//   function formatUrl() {
//     // local host
//     // return `http://127.0.0.1:8000/api/${route}/?format=json&searchInput=${
//     //   !user.search ? "" : user.search
//     // }&communities=${formatArray(communities)}&skills=${formatArray(
//     //   skills
//     // )}&interests=${formatArray(interests)}`;

//     // Heroku https://murmuring-basin-78610.herokuapp.com/

//     // Digital Ocean: https://dolphin-app-aeqog.ondigitalocean.app/

//     // const rootUrl = process.env.NODE_ENV == 'production' ? "https://murmuring-basin-78610.herokuapp.com"  
//     //   : "http://127.0.0.1:8000";

//     const rootUrl = "https://dolphin-app-aeqog.ondigitalocean.app";

//     return `${rootUrl}/api/${route}/?format=json&searchInput=${
//       !user.search ? "" : user.search
//     }&communities=${formatArray(communities)}&skills=${formatArray(
//       skills
//     )}&interests=${formatArray(interests)}`;
//   }

//   async function fetchUser() {
//     console.log(formatUrl());
//     try {
//       // await fetch(formatUrl(), {
//       //   headers: {
//       //     Authorization: "4e9f4c0735a434e094da78c61faa290881016460",
//       //   },
//       // })
//       //   .then((a) => a.json())
//       //   .then((data) => setData(data))
//       //   .then(() => (setRefresh ? setRefresh(!refresh) : void 0));

//       const res = await fetch(formatUrl(), {
//         headers: {
//           Authorization: "4e9f4c0735a434e094da78c61faa290881016460",
//         },
//       });

//       const data = await res.json();
//       console.log("Data from fetch and URL", data, formatUrl());

//       setData(data);
//       setRefresh(setRefresh ? setRefresh(!refresh): void 0);


//     } catch (e) {
//       console.log(e);
//     }
//     // finally {
//     //   console.log("Done!");
//     // }
//   }
//   fetchUser();
// }


