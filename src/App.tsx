import { useLayoutEffect, useRef, useState } from 'react'
import './App.css'
// import 'animate.css';
import anime from 'animejs';


interface Size {
  width: number;
  height: number;
}

const App = () => {
  const [count, setCount] = useState(0);

  const [size, setSize] = useState<Size>({ width: window.innerWidth, height: window.innerHeight })

  const [pageIndex, setPageIndex] = useState(0)


  const pagesRef = useRef<HTMLElement[]>([]);
  const pages = pagesRef.current;

  useLayoutEffect(() => {
    window.onresize = () => {
      console.log("window size w * h", window.innerWidth, window.innerHeight);
      console.log("windows", window.screen);
    }

    // window.onclick = () => {
    //   setPageIndex((index) => index + 1);
    // };

    // document.body.onmousedown = (e) => {
    //   console.log(e.clientX, e.clientY);
    // }

    // document.body.onmouseup = (e) => {
    //   console.log(e.clientX, e.clientY);
    // }

    // document.body.onmousemove = (e) => {
    //   console.log("onmousemove", e);
    // }

    const section = document.querySelectorAll("section");
    section.forEach((el, index) => {
      if (index === pageIndex) {
        el.style.zIndex = "100";
      }
      pagesRef.current.push(el);
    });
  }, []);


  console.log("index", pageIndex);


  const move = (targets: anime.AnimeParams["targets"], options: anime.AnimeParams) => {
    anime({
      targets,
      duration: 800,
      easing: 'easeInOutExpo',

      ...options
    })

  }


  const prev = () => {

    const currantPage = pages[pageIndex];
    currantPage.style.zIndex = "50";
    move(currantPage, {
      translateY: [0, size.height]
    });

    const nextPage = pages[pageIndex - 1];
    nextPage.style.zIndex = "100";
    move(nextPage, {
      translateY: [-size.height, 0],
    });


    setPageIndex(pageIndex - 1);

  };


  const next = () => {


    const currantPage = pages[pageIndex];

    currantPage.style.zIndex = "50";
    move(currantPage, {
      translateY: [0, -size.height],
    });


    const nextPage = pages[pageIndex + 1];
    nextPage.style.zIndex = "100";
    move(nextPage, {
      translateY: [size.height, 0]
    });

    setPageIndex(pageIndex + 1);
  }


  return (
    <>
      <section>
        <h1 className="animate__animated animate__bounce">An animated element</h1>
        <button onClick={next}>
          next
        </button>

        page1
      </section>
      <section>
        <button onClick={next}>
          next
        </button>
        <button onClick={prev}>
          prev
        </button>
        page2
      </section>
      <section>
        <button onClick={prev}>
          prev
        </button>
        page3
      </section>
    </>
  )
}

export default App
