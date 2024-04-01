import { useState, useEffect } from "react";

import { copy, linkIcon, loader, tick, submit, close, trash } from "../assets";
import { Summurizer } from "../api/article";
import { Tooltip } from '@chakra-ui/react'
import { useSnapshot } from "valtio";
import state from "../store";
import { ReactTyped } from "react-typed";



const Demo = () => {

   const [article, setArticle] = useState({
      url: '',
      summary: '',
      lang: ''
   })


   const [allArticles, setAllArticles] = useState([])
   const [isSummarize, setisSummarize] = useState(false)
   const [slectedArticle, setSelectedArticle] = useState(false)
   const [copied, setCopied] = useState("")
   const snap = useSnapshot(state)
   const [typed, setTyped] = useState(false)

   useEffect(() => {
      try {
         const articlesFromlocalStorage = JSON.parse(
            localStorage.getItem("articles")
         )

         if (articlesFromlocalStorage && articlesFromlocalStorage.length > 0) {

            setAllArticles(articlesFromlocalStorage)
         }
         if (!localStorage.getItem("lang")) {
            localStorage.setItem("lang", JSON.stringify('en'))
         }

      } catch (error) {
         console.log(error)
      }
   }, [])


   const handleCopy = (copyUrl) => {
      setCopied(copyUrl)
      navigator.clipboard.writeText(copyUrl)
      setTimeout(() => {
         setCopied(false)
      }, 3000);
   }

   const handleDelete = (summary) => {
      const updateArticles = allArticles.filter((item) => item.summary != summary)
      setAllArticles(updateArticles)
      setArticle({ ...article, url: "", summary: "" }),
         setSelectedArticle('')
      localStorage.removeItem('articles')
      localStorage.setItem('articles', JSON.stringify(updateArticles))
   }

   const handleSubmit = async (e) => {
      e.preventDefault()
      try {
         setisSummarize(true)
         const { data } = await Summurizer(article.url)

         if (data?.summary) {
            const newArticle = { ...article, summary: data.summary, lang: snap.lang }
            const updateArticle = [newArticle, ...allArticles]
            setArticle(newArticle)
            setAllArticles(updateArticle)
            setSelectedArticle(0)
            setTyped(true)

            localStorage.setItem('articles', JSON.stringify(updateArticle))
            setisSummarize(false)
         }
      } catch (error) {
         alert("something went wrong please try later")
         setisSummarize(false)
         console.log(error)
      }

   }

   return (
      <section className="mt-16 w-full max-w-xl">
         {/* Search */}
         <div className="flex flex-col w-full gap-2">
            <form
               className="relative form flex items-center justify-center"
               onSubmit={handleSubmit}>

               <img src={linkIcon} alt="linkicon" className="absolute left-0 my-2 w-5 ml-3" />
               <img src={close} alt="linkclose"
                  className="close_btn hidden cursor-pointer absolute  right-10 my-2 w-5 mr-3"
                  onClick={() => {
                     setArticle({ ...article, url: "", summary: "" }),
                        setSelectedArticle('')
                  }
                  } />

               <input
                  type="url"
                  value={article.url}
                  placeholder="Enter a URL"
                  onChange={(e) => setArticle({ ...article, url: e.target.value })}
                  required
                  className="url_input peer text-ellipsis overflow-hidden" />

               <button
                  type="submit"
                  className="submit_btn peer-focus:border-gray-700"
                  disabled={isSummarize}>

                  <img src={submit} alt="submit_icon" />

               </button>
            </form>

            <div className='flex flex-col gap-1 max-h-60 overflow-y-auto'>
               {allArticles?.reverse()?.map((item, index) => (
                  <div
                     key={`link-${index}`}
                     onClick={(e) => { setArticle(item), setSelectedArticle(index), e.stopPropagation(),setTyped(false) }}
                     className={`link_card ${index === slectedArticle ? "border-2 border-blue-500" : "border-gray-200"}`}
                  >
                     <Tooltip label={`${copied ? "Copied!" : "Copy"}`}>
                        <div className='copy_btn' onClick={(e) => { handleCopy(item.url), e.stopPropagation() }}>
                           <img
                              src={copied === item.url ? tick : copy}
                              alt={"copy_icon"}
                              className='w-[40%] h-[40%] object-contain'
                           />
                        </div>
                     </Tooltip>
                     <p className='flex-1 font-satoshi text-blue-700 font-medium text-sm truncate'>
                        {item.url}
                     </p>
                     <Tooltip label={`Delete`}>
                        <div className='copy_btn z-10' onClick={(e) => { handleDelete(item.summary), e.stopPropagation() }}>
                           <img src={trash} className='w-[50%] h-[50%] object-contain' alt="trash" />
                        </div>
                     </Tooltip>
                  </div>
               ))}
            </div>
         </div>

         {/* Display Result */}
         <div className='my-10 max-w-full flex justify-center items-center'>
            {isSummarize ?
               <img src={loader} alt='loader' className='w-20 h-20 object-contain' />
               :
               (article.summary && (
                  <div dir={article.lang === "ar" ? "rtl" : "ltr"} className='flex flex-col gap-3 w-full'>
                     <h2 className='font-satoshi font-bold text-gray-600 text-xl'>
                        {article.lang === "ar" ? (
                           <>
                              ملخص  <span className='blue_gradient'> المقالة</span>
                           </>
                        ) : (
                           <>
                              Article <span className='blue_gradient'>Summary</span>
                           </>
                        )}
                     </h2>

                     <div className='summary_box '>
                        <p className='font-inter font-medium text-sm text-gray-700'>
                          {typed?
                            <ReactTyped
                              strings={[article.summary]}
                              typeSpeed={10}
                              showCursor={false}
                              loop={false}
                           />:
                              (article.summary)
                          }
                        </p>
                     </div>
                  </div>

               ))
            }
         </div>
      </section >
   );
}

export default Demo;
