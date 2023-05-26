import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getAllTemplates} from "../../store/actions/templates";
import ReactPlayer from "react-player";
import {includes, isEmpty, pull, sumBy, xor} from "lodash";
import moment from 'moment'
import {AiOutlineSearch} from "react-icons/ai";

function StartPage(props) {
    const playerRefs = useRef([]);
    let templates = useSelector(store => store.templates.templatesList)
    const [formData, setFormData] = useState({filter: {}})
    const [playId, setPlayId] = useState(0)
    const [selected, setSelected] = useState([])
    const [sumDuration, setSumDuration] = useState('00:00')
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllTemplates(formData))
    }, [])
    const handlePlay = (ev) => {
        setPlayId(+ev.currentTarget.id)
    }

    const handleStop = (index) => {
        playerRefs.current[index].seekTo(0)
        setPlayId(0)
    }

    const handleSelect = (id) => {
        let select = [...selected]
        if (selected.includes(id)) {
            select = [...pull(select, id)]
        } else {
            select = [...selected, id]
        }
        setSelected(select)
        const sumOfDurationsInSeconds = sumBy(templates, obj => includes(select, obj.id) ? parseInt(obj.duration) : 0);
        setSumDuration(moment.utc(sumOfDurationsInSeconds * 1000).format('mm:ss'))
    }

    const handleChange = (key, value) => {
        setFormData({...formData, [key]: value})
    }

    const handleSearch = (ev) => {
        ev.preventDefault()
        dispatch(getAllTemplates(formData))
    }

    const handleFilter = (value = '') => {
        if (!value) {
            setFormData({...formData, filter: {}})
            dispatch(getAllTemplates({...formData, filter: {}}))
        } else {
            setFormData({...formData, filter: {['type']: value}})
            dispatch(getAllTemplates({...formData, filter: {['type']: value}}))
        }

    }

    return (
        <div className='main'>
            <div className="start_menu_sidebar">
                <div className="sidebar_laptop">
                    <div className='start_menu_sidebar_input_div'>
                        <form onSubmit={handleSearch}>
                            <input type="text" value={formData.search || ''}
                                   onChange={ev => handleChange('search', ev.target.value)} placeholder="Search"/>
                            <div className='search-icon'>
                                <AiOutlineSearch onClick={handleSearch} size={25}/>
                            </div>
                        </form>
                    </div>
                    <div className="music_insert">
                        <div className="time_lapse">
                            <div className="insert"> Insert <span>{selected.length}</span>
                            </div>
                            <div className="insert">
                                <span>{sumDuration} sec</span>
                            </div>
                        </div>
                        <button className="deselect_button" onClick={event => {
                            setSumDuration('00:00')
                            setSelected([])
                        }}>Deselect All
                        </button>
                    </div>
                    <div className="actions">
                        <button className={isEmpty(formData.filter) ? 'selected_filter' : ''} onClick={ev => handleFilter()}>All</button>
                        <button className={formData.filter.type === 'slider' ? 'selected_filter' : ''} onClick={ev => handleFilter('slider')}>Images</button>
                        <button className={formData.filter.type === 'video' ? 'selected_filter' : ''} onClick={ev => handleFilter('video')}>Videos</button>
                    </div>
                    <div className="assets_action_buttons">
                        <a href="file:///C:/Users/karen.movsesyan/Downloads/previs%20%D0%BD%D0%BE%D0%B2%D1%8B%D0%B9%20%D0%BA%D0%BE%D0%B4%20(3)/start.html#">Video
                            Scenes</a>
                        <a href="file:///C:/Users/karen.movsesyan/Downloads/previs%20%D0%BD%D0%BE%D0%B2%D1%8B%D0%B9%20%D0%BA%D0%BE%D0%B4%20(3)/start.html#">Objects</a>
                        <a href="file:///C:/Users/karen.movsesyan/Downloads/previs%20%D0%BD%D0%BE%D0%B2%D1%8B%D0%B9%20%D0%BA%D0%BE%D0%B4%20(3)/start.html#">Hello
                            animation</a>
                        <a href="file:///C:/Users/karen.movsesyan/Downloads/previs%20%D0%BD%D0%BE%D0%B2%D1%8B%D0%B9%20%D0%BA%D0%BE%D0%B4%20(3)/start.html#">Tablet
                            Scenes</a>
                        <a href="file:///C:/Users/karen.movsesyan/Downloads/previs%20%D0%BD%D0%BE%D0%B2%D1%8B%D0%B9%20%D0%BA%D0%BE%D0%B4%20(3)/start.html#">Wall</a>
                        <a href="file:///C:/Users/karen.movsesyan/Downloads/previs%20%D0%BD%D0%BE%D0%B2%D1%8B%D0%B9%20%D0%BA%D0%BE%D0%B4%20(3)/start.html#">Object
                            animation</a>
                    </div>
                    <a href="file:///C:/Users/karen.movsesyan/Downloads/previs%20%D0%BD%D0%BE%D0%B2%D1%8B%D0%B9%20%D0%BA%D0%BE%D0%B4%20(3)/start.html#"
                       className="send_button">Done</a>
                </div>
                <div className="sidebar_tablet">
                    <div className="sidebar_top">
                        <input type="text" placeholder="Search"/>
                        <div className="music_insert">
                            <div className="time_lapse">
                                <div className="insert"> Insert <span>1</span>
                                </div>
                                <div className="timer">
                                    <p>15:00 sec</p>
                                </div>
                            </div>
                            <a href="file:///C:/Users/karen.movsesyan/Downloads/previs%20%D0%BD%D0%BE%D0%B2%D1%8B%D0%B9%20%D0%BA%D0%BE%D0%B4%20(3)/start.html"
                               className="deselect_button">Deselect All</a>
                        </div>
                        <div className="actions">
                            <a href="file:///C:/Users/karen.movsesyan/Downloads/previs%20%D0%BD%D0%BE%D0%B2%D1%8B%D0%B9%20%D0%BA%D0%BE%D0%B4%20(3)/start.html#">All</a>
                            <a href="file:///C:/Users/karen.movsesyan/Downloads/previs%20%D0%BD%D0%BE%D0%B2%D1%8B%D0%B9%20%D0%BA%D0%BE%D0%B4%20(3)/start.html#">Images</a>
                            <a href="file:///C:/Users/karen.movsesyan/Downloads/previs%20%D0%BD%D0%BE%D0%B2%D1%8B%D0%B9%20%D0%BA%D0%BE%D0%B4%20(3)/start.html#">Videos</a>
                        </div>
                    </div>
                    <div className="assets_action_buttons">
                        <a href="file:///C:/Users/karen.movsesyan/Downloads/previs%20%D0%BD%D0%BE%D0%B2%D1%8B%D0%B9%20%D0%BA%D0%BE%D0%B4%20(3)/start.html#">Video
                            Scenes</a>
                        <a href="file:///C:/Users/karen.movsesyan/Downloads/previs%20%D0%BD%D0%BE%D0%B2%D1%8B%D0%B9%20%D0%BA%D0%BE%D0%B4%20(3)/start.html#">Objects</a>
                        <a href="file:///C:/Users/karen.movsesyan/Downloads/previs%20%D0%BD%D0%BE%D0%B2%D1%8B%D0%B9%20%D0%BA%D0%BE%D0%B4%20(3)/start.html#">Hello
                            animation</a>
                        <a href="file:///C:/Users/karen.movsesyan/Downloads/previs%20%D0%BD%D0%BE%D0%B2%D1%8B%D0%B9%20%D0%BA%D0%BE%D0%B4%20(3)/start.html#">Tablet
                            Scenes</a>
                        <a href="file:///C:/Users/karen.movsesyan/Downloads/previs%20%D0%BD%D0%BE%D0%B2%D1%8B%D0%B9%20%D0%BA%D0%BE%D0%B4%20(3)/start.html#">Wall</a>
                        <a href="file:///C:/Users/karen.movsesyan/Downloads/previs%20%D0%BD%D0%BE%D0%B2%D1%8B%D0%B9%20%D0%BA%D0%BE%D0%B4%20(3)/start.html#">Hello
                            animation</a>
                    </div>
                </div>
            </div>
            <div className="content start_page">
                <div className="actions">
                    <a href="file:///C:/Users/karen.movsesyan/Downloads/previs%20%D0%BD%D0%BE%D0%B2%D1%8B%D0%B9%20%D0%BA%D0%BE%D0%B4%20(3)/start.html#">All</a>
                    <a href="file:///C:/Users/karen.movsesyan/Downloads/previs%20%D0%BD%D0%BE%D0%B2%D1%8B%D0%B9%20%D0%BA%D0%BE%D0%B4%20(3)/start.html#">Images</a>
                    <a href="file:///C:/Users/karen.movsesyan/Downloads/previs%20%D0%BD%D0%BE%D0%B2%D1%8B%D0%B9%20%D0%BA%D0%BE%D0%B4%20(3)/start.html#">Videos</a>
                </div>
                <div className="template_title">
                    {templates && templates.length &&
                        <div className="template_numbers"> {templates.length} unique template scenes</div>
                    }
                </div>
                <div className="cards_row">
                    {templates && templates.map(template => (
                        <div key={template.id} id={template.id} onClick={ev => handleSelect(+ev.currentTarget.id)}
                             className={selected.includes(+template.id) ? "card selected_card" : "card"}>
                            <div className="card_header">
                                <p>{template.title}</p>
                            </div>
                            <div id={template.id} className="card_body" onMouseEnter={handlePlay}
                                 onMouseLeave={ev => handleStop(ev.currentTarget.id)}>
                                <ReactPlayer
                                    ref={(player) => (playerRefs.current[template.id] = player)}
                                    url={template.name}
                                    playing={playId === template.id}
                                    controls={false}
                                    volume={0}
                                    playbackRate={1.0}
                                    style={{borderRadius: '20px', width: '100%', height: "100%"}}
                                />
                            </div>
                            <div className="card_footer">
                                <div className="duration">
                                    Duration: <span>{template.duration} sec.</span>
                                </div>
                                <div className="characters">
                                    Characters: <span>250</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="bottom_action">
                <a href="file:///C:/Users/karen.movsesyan/Downloads/previs%20%D0%BD%D0%BE%D0%B2%D1%8B%D0%B9%20%D0%BA%D0%BE%D0%B4%20(3)/start.html#"
                   className="send_button">Send</a>
                <div className="bottom_menu">
                    <div className="tutorial">
                        <a href="file:///C:/Users/karen.movsesyan/Downloads/previs%20%D0%BD%D0%BE%D0%B2%D1%8B%D0%B9%20%D0%BA%D0%BE%D0%B4%20(3)/start.html#"
                           className="watch_button">Watch tutorial</a>
                        <a href="file:///C:/Users/karen.movsesyan/Downloads/previs%20%D0%BD%D0%BE%D0%B2%D1%8B%D0%B9%20%D0%BA%D0%BE%D0%B4%20(3)/start.html#"
                           className="question_item">
                            <svg width="17" height="17" viewBox="0 0 17 17" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M6.2203 5.83398C6.3247 5.5876 6.46878 5.35874 6.64782 5.1569C6.93877 4.82892 7.31158 4.58408 7.72817 4.44741C8.14475 4.31074 8.59015 4.28714 9.01884 4.37902C9.44753 4.4709 9.84414 4.67497 10.1681 4.97037C10.4921 5.26577 10.7318 5.6419 10.8628 6.06031C10.9937 6.47872 11.0112 6.92441 10.9135 7.3518C10.8158 7.7792 10.6063 8.17298 10.3065 8.49288C10.0067 8.81279 9.62734 9.04735 9.20718 9.17258L8.85 9.27904V9.65175V9.7H8.15V8.925C8.15 8.83217 8.18687 8.74315 8.25251 8.67751C8.31815 8.61187 8.40717 8.575 8.5 8.575H8.50003C8.83619 8.57498 9.16543 8.4795 9.44945 8.29967C9.73347 8.11984 9.96058 7.86306 10.1044 7.55921L9.6524 7.34535L10.1044 7.55921C10.2481 7.25535 10.3027 6.91691 10.2616 6.58326C10.2206 6.24962 10.0856 5.93449 9.8725 5.67454C9.65935 5.4146 9.37678 5.22052 9.05764 5.1149C8.73851 5.00927 8.39594 4.99644 8.0698 5.0779C7.74366 5.15936 7.44736 5.33176 7.21536 5.57503C7.1008 5.69517 7.00425 5.83015 6.92792 5.97572L6.2203 5.83398ZM8.5 16.5C4.08159 16.5 0.5 12.9184 0.5 8.5C0.5 4.08159 4.08159 0.5 8.5 0.5C12.9184 0.5 16.5 4.08159 16.5 8.5C16.5 12.9184 12.9184 16.5 8.5 16.5ZM8.5 15.8C10.4361 15.8 12.2929 15.0309 13.6619 13.6619C15.0309 12.2929 15.8 10.4361 15.8 8.5C15.8 6.56392 15.0309 4.70714 13.6619 3.33812C12.2929 1.96911 10.4361 1.2 8.5 1.2C6.56392 1.2 4.70714 1.96911 3.33812 3.33812C1.96911 4.70714 1.2 6.56392 1.2 8.5C1.2 10.4361 1.96911 12.2929 3.33812 13.6619C4.70714 15.0309 6.56392 15.8 8.5 15.8ZM8.85 11.55V12.25H8.15V11.55H8.85Z"
                                    fill="#050038" stroke="#050038"/>
                            </svg>
                        </a>
                    </div>
                    <a href="file:///C:/Users/karen.movsesyan/Downloads/previs%20%D0%BD%D0%BE%D0%B2%D1%8B%D0%B9%20%D0%BA%D0%BE%D0%B4%20(3)/start.html#"
                       className="hamburger_menu">
                        <svg width="31" height="20" viewBox="0 0 31 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2 2H28.9231" stroke="#FF6575" strokeWidth="3" strokeLinecap="round"/>
                            <path d="M2 10H28.9231" stroke="#FF6575" strokeWidth="3" strokeLinecap="round"/>
                            <path d="M2 18H28.9231" stroke="#FF6575" strokeWidth="3" strokeLinecap="round"/>
                        </svg>
                    </a>
                </div>
            </div>
        </div>
    );
}

export default StartPage;