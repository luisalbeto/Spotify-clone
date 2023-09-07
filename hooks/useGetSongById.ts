import { Song } from "@/types";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useEffect, useMemo, useState } from "react"
import { toast } from "react-hot-toast";


const useGetSongById = (id?: string) => {
  const [ isLoading, setIsloading] = useState(false);
  const [song, setSong] = useState<Song | undefined>(undefined);
  const { supabaseClient } = useSessionContext();

  useEffect(() => {
    if(!id){
      return;
    }

    setIsloading(true);

    const fetchSong = async () => {
      const { data, error } = await supabaseClient
      .from('songs')
      .select('*')
      .eq('id', id)
      .single();

      if (error) {
        setIsloading(false);
        return toast.error(error.message);
      }
      setSong(data as Song);
      setIsloading(false);
    }

    fetchSong();
  }, [id, supabaseClient]);

  return useMemo(() => ({
    isLoading,
    song
  }),[isLoading, song]);
};

export default useGetSongById;