import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { ThemeProvider } from 'styled-components';
import { styledHelpers, TextField, Button } from 'grape-ui-react';
import { SearchForm } from './Search.style';
import { CgSearch } from 'react-icons/cg';
import ResultList from '../ResultList/ResultList';
import Definition from '../Definition/Definition';
import Message from '../Message/Message';
import 'pure-react-carousel/dist/react-carousel.es.css';

const theme = {
	buttons: {
		...styledHelpers.buttonThemes(),
	},
};

export interface SearchProps {
}

export const Search: React.FC<SearchProps> = function(props: {

	}) {
	const [liveSearchTerm, setLiveSearchTerm] = useState<string>('');
	const [submittedSearchTerm, setSubmittedSearchTerm] = useState<string>('');
	const apiKeyDict = '16a63a57-7277-4843-8034-4285a3b986ee';
	//const apiKeyThes = '0803c54f-d908-4630-86a1-0e31e656d692';
	const [definitions, setDefinitions] = useState<any[]>([]);

	/**
	 * Every time the input value changes, the liveSearchTerm variable is updated
	 * @param event
	 */
	function updateSearchTerm(event: React.ChangeEvent<HTMLInputElement>) {
		setLiveSearchTerm(event.target.value);
	}

	/**
	 * When the search form is submitted, recognise the input is now "the term to actually search for"
	 * by putting it into a different state variable.
	 * Reason for separating them like this to show appropriate messages,
	 * if they're the same variable then users see "nothing found" when they've started typing without submitting
	 * @param event
	 */
	function handleSearchSubmit(event: { preventDefault: () => void; }) {
		event.preventDefault();

		setSubmittedSearchTerm(liveSearchTerm);
		// can't run the actual search within this function because it will get the previous value of submittedSearchTerm,
		// not the one we just set here, so see below useEffect hook for the actual search query
	}

	/**
	 * When the submitted search term changes, do the API query
	 * and save the definitions to the relevant state variable
	 */
	useEffect(() => {
		getDefinitions(submittedSearchTerm).then(definitions => {
			setDefinitions(definitions.slice(0,3));
		})
	}, [submittedSearchTerm]);


	/**
	 * The function to get definitions from the API
	 * @param term
	 */
	function getDefinitions(term: string) {
		const query = `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${term}?key=${apiKeyDict}`;

		return axios.get(query)
			.then(response => {
				return response.data;
			}).catch(error => {
				console.log(error);
			})
	}

	/**
	 * Component output
	 */
	return (
		<ThemeProvider theme={theme}>
			<SearchForm onSubmit={handleSearchSubmit}>
				<TextField labelText="Search for:" placeholder="Enter search term" autoFocus={true} onChange={updateSearchTerm} />
				<Button variant="dark" onClick={handleSearchSubmit}><CgSearch/></Button>
			</SearchForm>
			{ /* If a search term has been submitted and returned definition objects, show definition cards  */ }
			{submittedSearchTerm && definitions && (typeof definitions[0] == 'object') ?
				<ResultList>
					{definitions.map((definition, index) => (
						<Definition key={index}
									word={definition.hwi.hw}
									type={definition.fl}
									date={definition.date ? (definition.date).split('{')[0] : null}
									definitions={definition.shortdef}/>
					))}
				</ResultList>
				: null
			}
			{ /* If a search term has been submitted but there were no valid definitions, show an error */ }
			{ submittedSearchTerm && (!definitions || typeof definitions[0] !== 'object') ?
				<Message color="brandDanger" text="Nothing found"/>
				: null
			}
			{ /* If there is no submitted search term, show a prompt */ }
			{ !submittedSearchTerm ?
				<Message color="brandSuccess" text="Please enter a search term"/>
				: null
			}
		</ThemeProvider>
	)
}

export default Search;