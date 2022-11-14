import {useState} from "react";
import PropTypes from 'prop-types';

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
            <header>
                <form onSubmit={handleSubmit}>
                    <button type="submit">
                    <span>Search</span>
                    </button>
    
                    <input
                        type="text"
                        autoComplete="off"
                        autoFocus
                        placeholder="Search images and photos"
                        onChange={handleInputChange}
                        value={input}
                    />
                </form>
            </header>
        )
}

Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};