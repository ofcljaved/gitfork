export async function fetchUser(username:string) {
  try {
    const response = await fetch(
      `https://gitfrk.vercel.app/api/v1/user?name=${username}`,
    );
    const result = await response.json();
    if (!result.success) throw new Error(result.message);
    return result.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}
