'use server'; 

export const fetchImageURI = async (tokenURI: string) => {
    try {
      const fetchURI = await fetch(tokenURI);
      
      if (!fetchURI) return undefined;

      const response = await fetchURI.json();

      return response;
    } catch (err) {
      return undefined;
    }
}