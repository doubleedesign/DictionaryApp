import React, {useState} from 'react';
import axios from 'axios';
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
	const [searchTerm, setSearchTerm] = useState<string>('');
	const apiKeyDict = '16a63a57-7277-4843-8034-4285a3b986ee';
	const [definitions, setDefinitions] = useState<any[]>([]);

	function updateSearchTerm(event: React.ChangeEvent<HTMLInputElement>) {
		setSearchTerm(event.target.value);
	}

	function handleSearch(event: { preventDefault: () => void; }) {
		event.preventDefault();

		getDefinitions(searchTerm).then(definitions => {
			setDefinitions(definitions.slice(0,3));
		})
	}

	function getDefinitions(term: string) {
		const query = `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${term}?key=${apiKeyDict}`;

		return axios.get(query)
			.then(response => {
				return response.data;
			}).catch(error => {
				console.log(error);
			})
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