import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { ThemeProvider } from 'styled-components';
import { styledHelpers, TextField, Button, Progress } from 'grape-ui-react';
import { SearchForm } from './Search.style';
import { CgSearch } from 'react-icons/cg';
import ResultList from '../ResultList/ResultList';
import Definition from '../Definition/Definition';
import Message from '../Message/Message';
import Gallery from '../Gallery/Gallery';
import 'pure-react-carousel/dist/react-carousel.es.css';
import Banner from "../Banner/Banner";

const theme = {
	buttons: {
		...styledHelpers.buttonThemes(),
	},
};

export const Search: React.FC = function() {
	const [liveSearchTerm, setLiveSearchTerm] = useState<string>('');
	const [submittedSearchTerm, setSubmittedSearchTerm] = useState<string>('');
	const apiKeyDict = '16a63a57-7277-4843-8034-4285a3b986ee';
	const apiKeyThes = '0803c54f-d908-4630-86a1-0e31e656d692';
	const apiKeyImages = 'wXyDQXrTFTAwuxLgBTDEZnzB4-euefC31caZoskUe9A';
	const [definitions, setDefinitions] = useState<any[]>([]);
	const [bannerImage, setBannerImage] = useState<string>("https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyNTk0NTl8MHwxfHNlYXJjaHw2fHxib29rc3xlbnwwfHx8fDE2MzE2NzkzMDY&ixlib=rb-1.2.1&q=80&w=1920");
	const [images, setImages] = useState<any[]>([]);
	const [queryRunning, setQueryRunning] = useState<boolean>(false);

	/**
	 * Every time the input value changes, the liveSearchTerm variable is updated
	 * @param event
	 */
	function updateSearchTerm(event: React.ChangeEvent<HTMLInputElement>) {
		setLiveSearchTerm(event.target.value);
	}

	/**
	 * Handle search term being changed externally
	 * (e.g. passed up from a definition via onSynonymClick prop)
	 * @param term
	 */
	function loadSearchTerm(term: string) {
		setLiveSearchTerm(term);
		setSubmittedSearchTerm(term);
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
	 * When the submitted search term changes, do the API queries
	 * and save the definitions and synonyms to the relevant state variables
	 */
	useEffect(() => {

		// setQueryRunning to true to show the loading state
		setQueryRunning(true);

		// Run definitions query followed by images query
		// and save the results to the relevant state variables
		getDefinitions(submittedSearchTerm).then(definitions => {
			setDefinitions(definitions.slice(0, 3));

			getImages(submittedSearchTerm).then(images => {
				setImages(images.results.slice(1,6));

				if(images.results[0]) {
					setBannerImage(images.results[0].urls.full);
				}
			})
		})
		.finally(() => {
			setQueryRunning(false);
		})

	}, [submittedSearchTerm]);


	/**
	 * The function to get word data from the Merriam-Webster API
	 * (The thesaurus API gets basic definition data as well as the synonyms, so just using the one query)
	 * @param term
	 */
	async function getDefinitions(term: string) {
		const query = `https://www.dictionaryapi.com/api/v3/references/thesaurus/json/${term}?key=${apiKeyThes}`;

		return axios.get(query)
			.then(response => {
				return response.data;
			})
			.catch(error => {
				console.log(error);
			})
	}

	/**
	 * The function to get images from the Unsplash API
	 * @param term
	 */
	async function getImages(term: string) {
		const query = `https://api.unsplash.com/search/photos?page=1&query=${term}&client_id=${apiKeyImages}`;

		return axios.get(query)
			.then(response => {
				return response.data;
			})
			.catch(error => {
				console.log(error);
			})
	}

	/**
	 * Utility function to add a delay before doing something
	 * @param milliseconds
	 */
	async function delay(milliseconds: number) {
		return new Promise(response => setTimeout(response, milliseconds));
	}

	/**
	 * Component output
	 */
	return (
		<ThemeProvider theme={theme}>

			<Banner imageURL={bannerImage ? bannerImage : ""}>
				<SearchForm onSubmit={handleSearchSubmit}>
					<TextField labelText="Search for:" placeholder="Enter search term" autoFocus={true} onChange={updateSearchTerm} value={liveSearchTerm} />
					<Button variant="dark" onClick={handleSearchSubmit}><CgSearch/></Button>
					<div className="progressWrapper">
						{ submittedSearchTerm && queryRunning ?
							<Progress indicatorColor="brandPrimary" trackColor="FormControlFilledBg" animationDuration="2s" />
							: <Progress total={10} value={0} trackColor="brandLight" />
						}
					</div>
				</SearchForm>
			</Banner>

			{ /* If a search term has been submitted and returned definition objects, show definition cards  */ }
			{submittedSearchTerm && !queryRunning && definitions && (typeof definitions[0] == 'object') ?
				<ResultList>
					{definitions.map((definition, index) => (
						<Definition key={index}
									word={definition.hwi.hw}
									type={definition.fl}
									definitions={definition.shortdef}
									synonyms={(definition.meta.syns).slice(0,5)}
									onSynonymClick={loadSearchTerm}/>
					))}
				</ResultList>
				: null
			}
			{ /* If a search term has been submitted and the query is still running, show progress indicator */ }
			{ submittedSearchTerm && queryRunning ?
				<Progress
					indicatorColor="brandPrimary"
					progressType="circular"
					trackColor="formControlFilledBg"
				/>
				: null
			}
			{ /* If a search term has been submitted and query run but there were no valid definitions, show an error */ }
			{ submittedSearchTerm && !queryRunning && (!definitions || typeof definitions[0] !== 'object') ?
				<Message color="brandDanger" text="Not found in dictionary"/>
				: null
			}
			{ /* If there is no submitted search term, show a prompt */ }
			{ !submittedSearchTerm ?
				<Message color="brandSuccess" text="Please enter a search term"/>
				: null
			}

			{ /* If a search term has been submitted and returned images, show them */ }
			{submittedSearchTerm && !queryRunning && images ? <Gallery images={images}/> : null }

		</ThemeProvider>
	)
}

export default Search;