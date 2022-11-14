import {useState} from "react";
import { Searchbar } from "./Searchbar/Searchbar";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Button } from "./Button/Button";
import { Container } from "./App.styled";


export default function App() {
  const [input, setInput] = useState('')
  const [page, setPage] = useState(0)

  const handleFormSubmit = (input, page) => {
    setInput(input)
    setPage(page)
  }

  const loadMore = () => {
    setPage(prevState => prevState + 1)
  }

    return(
      <Container>
      <Searchbar onSubmit={handleFormSubmit}/>
      <ImageGallery input={input} page={page}/>
      {page >= 1 && (
        <Button onClick={loadMore}/>
      )}
      </Container>
    )
}