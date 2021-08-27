import React, {useState} from 'react';
import { ThemeProvider } from 'styled-components';
import { styledHelpers, TextField, Button } from 'grape-ui-react';
import { SearchForm } from './Search.style';
import { CgSearch } from "react-icons/cg";

const theme = {
	buttons: {
		...styledHelpers.buttonThemes(),
	},
};

export interface SearchProps {

}

export const Search: React.FC<SearchProps> = function(props: {

	}) {
	const [searchTerm, setSearchTerm] = useState('');

	function updateSearchTerm(event: React.ChangeEvent<HTMLInputElement>) {
		setSearchTerm(event.target.value);
	}

	function handleSearch(event: { preventDefault: () => void; }) {
		event.preventDefault();
		alert('handle search');
	}

	return (
		<ThemeProvider theme={theme}>
			<SearchForm onSubmit={handleSearch}>
				<TextField labelText="Search for:" placeholder="Enter search term" autoFocus={true} onChange={updateSearchTerm} />
				<Button variant="dark" onClick={handleSearch}><CgSearch/></Button>
			</SearchForm>
		</ThemeProvider>
	)
}

export default Search;