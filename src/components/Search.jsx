import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom'; 
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaChevronLeft, FaChevronRight, FaGlobeAmericas } from 'react-icons/fa';
import { useLanguage } from '../contexts/LanguageContext';
import './Search.css';

const SkeletonCard = () => (
    <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="search-result-card"
    >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
            <motion.div 
                animate={{ opacity: [0.3, 0.6, 0.3] }} 
                transition={{ duration: 1.5, repeat: Infinity }}
                style={{ width: '16px', height: '16px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }} 
            />
            <motion.div 
                animate={{ opacity: [0.3, 0.6, 0.3] }} 
                transition={{ duration: 1.5, repeat: Infinity }}
                style={{ width: '120px', height: '14px', borderRadius: '4px', background: 'rgba(255,255,255,0.1)' }} 
            />
        </div>
        <motion.div 
            animate={{ opacity: [0.3, 0.6, 0.3] }} 
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
            style={{ width: '60%', height: '24px', borderRadius: '4px', background: 'rgba(255,255,255,0.15)', marginBottom: '12px' }} 
        />
        <motion.div 
            animate={{ opacity: [0.3, 0.6, 0.3] }} 
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
            style={{ width: '100%', height: '16px', borderRadius: '4px', background: 'rgba(255,255,255,0.1)', marginBottom: '8px' }} 
        />
        <motion.div 
            animate={{ opacity: [0.3, 0.6, 0.3] }} 
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.6 }}
            style={{ width: '80%', height: '16px', borderRadius: '4px', background: 'rgba(255,255,255,0.1)' }} 
        />
    </motion.div>
);

const Search = () => {
    const { t, lang } = useLanguage();
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
                setLoading(false);
                setError(lang === 'vi' 
                    ? "Thiếu API Key. Vui lòng kiểm tra cấu hình." 
                    : "Missing API Key. Please check configuration.");
                setResults([]);
                return;
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
            // Show friendly localized error message
            setError(lang === 'vi' 
                ? "API Key đã đạt giới hạn hoặc gặp lỗi. Bạn vui lòng quay lại sau nhé!" 
                : "API Key limit reached or error occurred. Please try again later!");
            setResults([]); 
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
        <section className="search-page">
            <div className="search-bg-animation"></div>
            
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="search-content-wrapper"
            >
                <h1 className="search-title">{t.search.title}</h1>

                <div className="search-box-container">
                    <FaSearch className="search-box-icon" />
                    <input 
                        type="text" 
                        placeholder={t.search.placeholder} 
                        className="search-box-input"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                    <button onClick={() => handleSearch(1)} className="search-box-btn">
                        {t.search.button}
                    </button>
                </div>

                {error && <div className="search-error">{error}</div>}

                <div className="search-results-container">
                    <AnimatePresence mode='wait'>
                        {loading ? (
                           <motion.div
                                key="skeleton"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%' }}
                           >
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <SkeletonCard key={i} />
                                ))}
                           </motion.div>
                        ) : (
                            <>
                                {results.map((item, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{ delay: index * 0.05 }}
                                        className="search-result-card"
                                        whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.1)' }}
                                    >
                                        <div className="search-result-header">
                                            <FaGlobeAmericas className="search-globe-icon" />
                                            <span className="search-site-name">{item.displayLink}</span>
                                        </div>
                                        <a href={item.link} target="_blank" rel="noopener noreferrer" className="search-link-title">
                                            {item.title}
                                        </a>
                                        <p className="search-snippet">{item.snippet}</p>
                                    </motion.div>
                                ))}
                            </>
                        )}
                    </AnimatePresence>

                    {searched && results.length === 0 && !loading && (
                        <p className="search-no-results">{t.search.noResults}</p>
                    )}
                </div>

                {results.length > 0 && (
                    <div className="search-pagination">
                        <button 
                            disabled={page === 1} 
                            onClick={() => handleSearch(page - 1)}
                            className="search-page-btn"
                            style={{ opacity: page === 1 ? 0.5 : 1 }}
                        >
                            <FaChevronLeft /> {t.search.prev}
                        </button>
                        <span className="search-page-number">Page {page}</span>
                        <button 
                            onClick={() => handleSearch(page + 1)}
                            className="search-page-btn"
                        >
                            {t.search.next} <FaChevronRight />
                        </button>
                    </div>
                )}
            </motion.div>
        </section>
    );
};

export default Search;
