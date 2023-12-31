import "./addfinca.scss";

type Props = {
    slug: string;
    columns: GridColDef[];
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  };


const addfinca = (props:Props) => {
  return (
    <div className="adfinca">addfinca</div>
  )
}

export default addfinca