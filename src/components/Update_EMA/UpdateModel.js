export default async function UpdateModel(isUser) {
  const res = await fetch(
    `https://dolphin-app-aeqog.ondigitalocean.app/${
      isUser ? "trainUser" : "trainProject"
    }`
  );
  console.log(res);
}
