// function to interleave two arrays

export default function interleave(users, projects) {
    const arr = [];
    const len = Math.max(users.length, projects.length);
      //  Alternates between user and project
      for (let i = 0; i < len; i++) {
        if (i < users.length) {
          // console.log(users[i]);
          arr.push(users[i]);
        }
        if (i < projects.length) {
          arr.push(projects[i]);
        }
      }
    
    return arr;
  }