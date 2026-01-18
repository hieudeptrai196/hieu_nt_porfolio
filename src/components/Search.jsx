import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom'; 
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaChevronLeft, FaChevronRight, FaGlobeAmericas } from 'react-icons/fa';
import { useLanguage } from '../contexts/LanguageContext';

// MOCK DATA for demonstration when API limits are hit or no key is provided
const MOCK_DATA = [
    {
        title: "React - The library for web and native user interfaces",
        link: "https://react.dev/",
        displayLink: "react.dev",
        snippet: "The library for web and native user interfaces. React lets you build user interfaces out of individual pieces called components. Create your own React components like Thumbnail, LikeButton, and Video. Then combine them into entire screens, pages, and apps."
    },
    {
        title: "Vite | Next Generation Frontend Tooling",
        link: "https://vitejs.dev/",
        displayLink: "vitejs.dev",
        snippet: "Vite is a build tool that aims to provide a faster and leaner development experience for modern web projects. It consists of two major parts: a dev server that provides rich feature enhancements over native ES modules..."
    },
    {
        title: "Tailwind CSS - Rapidly build modern websites without ever leaving your HTML.",
        link: "https://tailwindcss.com/",
        displayLink: "tailwindcss.com",
        snippet: "Tailwind CSS is a utility-first CSS framework for rapidly building custom user interfaces. Functionally, it is a set of classes that map to specific CSS properties."
    },
    {
        title: "Framer Motion",
        link: "https://www.framer.com/motion/",
        displayLink: "www.framer.com",
        snippet: "A production-ready motion library for React. Utilize the power of Framer Motion to create complex animations with ease."
    },
    {
        title: "VNPT - Tập đoàn Bưu chính Viễn thông Việt Nam",
        link: "https://vnpt.com.vn/",
        displayLink: "vnpt.com.vn",
        snippet: "VNPT là tập đoàn bưu chính viễn thông hàng đầu tại Việt Nam, cung cấp các dịch vụ viễn thông, công nghệ thông tin và truyền thông đa phương tiện."
    }
];

const Search = () => {
    const { t } = useLanguage();
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [searched, setSearched] = useState(false);
    const [error, setError] = useState(null);
    const [searchParams] = useSearchParams();

    // Keys are now loaded from environment variables for security
    const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY; 
    const CX = import.meta.env.VITE_SEARCH_ENGINE_ID;

    const executeSearch = async (searchQuery, pageNum = 1) => {
        if (!searchQuery?.trim()) return;
        
        setLoading(true);
        setError(null);
        setSearched(true);
        setPage(pageNum);

        // API Pagination: start index (1, 11, 21...)
        const startIndex = (pageNum - 1) * 10 + 1;

        try {
            // Check if user has replaced the placeholder keys
            if (!API_KEY || API_KEY === 'YOUR_GOOGLE_API_KEY_HERE') {
                // Simulate network delay for realistic feel
                await new Promise(resolve => setTimeout(resolve, 1000));
                
                console.warn("Using Mock Data. Please provide valid Google API Key and CX.");
                setResults(MOCK_DATA);
            } else {
                const response = await fetch(
                    `https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${CX}&q=${encodeURIComponent(searchQuery)}&start=${startIndex}`
                );

                const data = await response.json();

                if (data.error) {
                    throw new Error(data.error.message);
                }

                setResults(data.items || []);
            }
        } catch (err) {
            console.error("Search failed:", err);
            setError(`${t.search.error} (API Key missing or limit exceeded).`);
            setResults(MOCK_DATA); // Fallback to mock data on error
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const q = searchParams.get('q');
        if (q) {
            setQuery(q);
            executeSearch(q, 1);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchParams]);

    const handleSearch = (pageNum = 1) => {
        executeSearch(query, pageNum);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch(1);
        }
    };

    return (
        <section style={styles.container}>
            <div style={styles.backgroundAnimation}></div>
            
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                style={styles.contentWrapper}
            >
                <h1 style={styles.title}>{t.search.title}</h1>

                <div style={styles.searchBox}>
                    <FaSearch style={styles.searchIcon} />
                    <input 
                        type="text" 
                        placeholder={t.search.placeholder} 
                        style={styles.input}
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                    <button onClick={() => handleSearch(1)} style={styles.button}>
                        {t.search.button}
                    </button>
                </div>

                {loading && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        style={styles.loading}
                    >
                        <div className="spinner"></div> {t.search.loading}
                    </motion.div>
                )}

                {error && <div style={styles.error}>{error}</div>}

                <div style={styles.resultsContainer}>
                    <AnimatePresence mode='wait'>
                        {!loading && results.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ delay: index * 0.1 }}
                                style={styles.resultCard}
                                whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.1)' }}
                            >
                                <div style={styles.cardHeader}>
                                    <FaGlobeAmericas style={styles.globeIcon} />
                                    <span style={styles.siteName}>{item.displayLink}</span>
                                </div>
                                <a href={item.link} target="_blank" rel="noopener noreferrer" style={styles.linkTitle}>
                                    {item.title}
                                </a>
                                <p style={styles.snippet}>{item.snippet}</p>
                            </motion.div>
                        ))}
                    </AnimatePresence>

                    {searched && results.length === 0 && !loading && (
                        <p style={styles.noResults}>{t.search.noResults}</p>
                    )}
                </div>

                {results.length > 0 && (
                    <div style={styles.pagination}>
                        <button 
                            disabled={page === 1} 
                            onClick={() => handleSearch(page - 1)}
                            style={{...styles.pageBtn, opacity: page === 1 ? 0.5 : 1}}
                        >
                            <FaChevronLeft /> {t.search.prev}
                        </button>
                        <span style={styles.pageNumber}>Page {page}</span>
                        <button 
                            onClick={() => handleSearch(page + 1)}
                            style={styles.pageBtn}
                        >
                            {t.search.next} <FaChevronRight />
                        </button>
                    </div>
                )}
            </motion.div>
        </section>
    );
};

const styles = {
    container: {
        minHeight: '100vh',
        padding: '100px 20px 40px',
        color: '#fff',
        position: 'relative',
        overflow: 'hidden'
    },
    backgroundAnimation: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        // Assuming global CSS has gradient-bg or used similar to home
    },
    contentWrapper: {
        maxWidth: '800px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    title: {
        fontSize: '3rem',
        fontWeight: 'bold',
        marginBottom: '10px',
        textAlign: 'center',
        background: 'linear-gradient(90deg, #ff00cc, #333399)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
    },
    subtitle: {
        fontSize: '1.2rem',
        color: '#ccc',
        marginBottom: '40px',
        textAlign: 'center'
    },
    searchBox: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        borderRadius: '50px',
        padding: '10px 20px',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)'
    },
    searchIcon: {
        color: '#aaa',
        fontSize: '1.2rem',
        marginRight: '10px'
    },
    input: {
        flex: 1,
        background: 'transparent',
        border: 'none',
        color: '#fff',
        fontSize: '1.1rem',
        outline: 'none',
        padding: '10px'
    },
    button: {
        background: 'linear-gradient(90deg, #ff00cc, #333399)',
        border: 'none',
        color: '#fff',
        padding: '10px 25px',
        borderRadius: '30px',
        fontSize: '1rem',
        fontWeight: 'bold',
        cursor: 'pointer',
        transition: 'transform 0.2s',
    },
    loading: {
        marginTop: '20px',
        fontSize: '1.1rem',
        color: '#aaa',
        display: 'flex',
        alignItems: 'center',
        gap: '10px'
    },
    error: {
        marginTop: '20px',
        color: '#ff4d4d',
        backgroundColor: 'rgba(255, 77, 77, 0.1)',
        padding: '10px 20px',
        borderRadius: '10px'
    },
    resultsContainer: {
        width: '100%',
        marginTop: '40px',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px'
    },
    resultCard: {
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        padding: '20px',
        borderRadius: '15px',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        cursor: 'pointer',
        transition: 'background-color 0.3s'
    },
    cardHeader: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        marginBottom: '5px',
        fontSize: '0.9rem',
        color: '#aaa'
    },
    globeIcon: {
        fontSize: '0.8rem'
    },
    siteName: {
        fontWeight: '500'
    },
    linkTitle: {
        fontSize: '1.3rem',
        color: '#4dabf7',
        textDecoration: 'none',
        fontWeight: 'bold',
        display: 'block',
        marginBottom: '10px'
    },
    snippet: {
        fontSize: '1rem',
        color: '#ddd',
        lineHeight: '1.5'
    },
    noResults: {
        textAlign: 'center',
        color: '#aaa',
        marginTop: '20px'
    },
    pagination: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '20px',
        marginTop: '40px',
        marginBottom: '40px'
    },
    pageBtn: {
        background: 'rgba(255, 255, 255, 0.1)',
        border: 'none',
        color: '#fff',
        padding: '10px 20px',
        borderRadius: '10px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        fontSize: '1rem'
    },
    pageNumber: {
        fontSize: '1.1rem',
        fontWeight: 'bold'
    }
};

export default Search;
