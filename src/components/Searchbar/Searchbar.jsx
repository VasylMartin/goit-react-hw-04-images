import {useState} from "react";
import PropTypes from 'prop-types';
import { SearchContainer, SearchForm, SearchFormButton, SearchFormButtonLabel, SearchFormInput } from "./Searchbar.styler";

export default function Searchbar({onSubmit}) {
    const [input, setInput] = useState('')
    const [page, setPage] = useState(1)

    const handleInputChange = event => {
        setInput(event.currentTarget.value.toLowerCase())
    }

    const handleSubmit = event => {
        event.preventDefault()

        if(input.trim() === '') {
            return
        }
        
        onSubmit(input, page)

        setInput('')
        setPage(1)
    }
    
        return (
            <SearchContainer>
                <SearchForm onSubmit={handleSubmit}>
                    <SearchFormButton type="submit">
                    <SearchFormButtonLabel>Search</SearchFormButtonLabel>
                    </SearchFormButton>
    
                    <SearchFormInput
                        type="text"
                        autoComplete="off"
                        autoFocus
                        placeholder="Search images and photos"
                        onChange={handleInputChange}
                        value={input}
                    />
                </SearchForm>
            </SearchContainer>
        )
}

Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};