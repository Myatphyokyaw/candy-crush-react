import { useState, useEffect } from "react"
import react from "./images/react.svg.png"
import vue from "./images/vue.png"
import angular from "./images/angular.svg.png"
import js from "./images/js.png"
import php from "./images/php.svg.png"
import bootstrap from "./images/bootstrap.png"
import blank from "./images/blank.jpg"
const width = 8

const candyColors = [
  react,
  vue,
  angular,
  js,
  php,
  bootstrap,
  blank
]


const App = props => {

  const [currentColorArrangment, setCurrentColorArrangment] = useState([])
  const [squareBeingDrag, setSquareBeingDrag] = useState(null)
  const [squareBeingReplace, setSquareBeingReplace] = useState(null)


  const checkColumnOfThree = () => {

    for (let i = 0; i <= 47; i++) {
      const columnOfThree = [i, i + width, i + width * 2]
      const decidedColor = currentColorArrangment[i]


      if (columnOfThree.every(el => currentColorArrangment[el] === decidedColor)) {
        columnOfThree.forEach(square => currentColorArrangment[square] = blank)
        return true
      }

    }

  }

  const checkColumnOfFour = () => {

    for (let i = 0; i < 39; i++) {
      const columnOfFour = [i, i + width, i + width * 2, i + width * 3]
      const decidedColor = currentColorArrangment[i]


      if (columnOfFour.every(el => currentColorArrangment[el] === decidedColor)) {
        columnOfFour.forEach(square => currentColorArrangment[square] = blank)
        return true
      }

    }

  }

  const checkRowOfThree = () => {

    for (let i = 0; i < 64; i++) {
      const rowOfThree = [i, i + 1, i + 2]
      const decidedColor = currentColorArrangment[i]
      const notValid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 63, 64]


      if (notValid.includes(i)) continue

      if (rowOfThree.every(el => currentColorArrangment[el] === decidedColor)) {
        rowOfThree.forEach(square => currentColorArrangment[square] = blank)
        return true
      }

    }

  }

  const checkRowOfFour = () => {

    for (let i = 0; i < 64; i++) {
      const rowOfFour = [i, i + 1, i + 2, i + 3]
      const decidedColor = currentColorArrangment[i]
      const notValid = [5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53, 54, 55, 62, 63, 64]


      if (notValid.includes(i)) continue

      if (rowOfFour.every(el => currentColorArrangment[el] === decidedColor)) {
        rowOfFour.forEach(square => currentColorArrangment[square] = blank)
        return true
      }

    }

  }

  const moveIntoSquareBelow = () => {
    for (let i = 0; i <= 55; i++) {
      const firstRow = [0, 1, 2, 3, 4, 5, 6, 7]
      const isFirstRow = firstRow.includes(i)
      if (isFirstRow && currentColorArrangment[i] === blank) {
        currentColorArrangment[i] = candyColors[Math.floor(Math.random() * candyColors.length)]
      }
      if ((currentColorArrangment[i + width]) === blank) {
        currentColorArrangment[i + width] = currentColorArrangment[i]
        currentColorArrangment[i] = blank
      }
    }
  }

  const createBoard = () => {
    const randomColorArrangment = []
    for (let i = 0; i < width * width; i++) {
      const randomNumber = Math.floor(Math.random() * candyColors.length)
      const randomColor = candyColors[randomNumber]
      randomColorArrangment.push(randomColor)
    }
    setCurrentColorArrangment(randomColorArrangment)
  }

  useEffect(() => {
    createBoard()

  }, [])
  useEffect(() => {
    const timer = setInterval(() => {

      checkColumnOfFour()
      checkRowOfFour()
      checkColumnOfThree()
      checkRowOfThree()
      moveIntoSquareBelow()
      setCurrentColorArrangment([...currentColorArrangment])
    }, 100);

    return () => clearInterval(timer)

  }, [checkColumnOfFour, checkRowOfFour, checkColumnOfThree, checkRowOfThree, moveIntoSquareBelow, currentColorArrangment])


  const dragStart = (e) => {

    setSquareBeingDrag(e.target)
  }
  const dragDrop = (e) => {

    setSquareBeingReplace(e.target)
  }
  const dragEnd = (e) => {

    const SquareBeingDragId = parseInt(squareBeingDrag.getAttribute('data-id'))
    const SquareBeingReplaceId = parseInt(squareBeingReplace.getAttribute('data-id'))

    currentColorArrangment[SquareBeingReplaceId] = squareBeingDrag.getAttribute("src")
    currentColorArrangment[SquareBeingDragId] = squareBeingReplace.getAttribute("src")

    console.log("SquareBeingDragId", SquareBeingDragId)
    console.log("SquareBeingReplaceId", SquareBeingReplaceId)
    const validMoves = [
      SquareBeingDragId - 1,
      SquareBeingDragId - width,
      SquareBeingDragId + 1,
      SquareBeingDragId + width
    ]
    const validMovie = validMoves.includes(SquareBeingReplaceId)
    const isAColumnOfFour = checkColumnOfFour()
    const isARowOfFour = checkRowOfFour()
    const isAColumnOfThree = checkColumnOfThree()
    const isARowOfThree = checkRowOfThree()

    if (SquareBeingReplaceId && validMovie && (isARowOfThree || isARowOfFour || isAColumnOfFour || isAColumnOfThree)) {
      setSquareBeingDrag(null)
      setSquareBeingReplace(null)
      console.log("Hello")
      return
    } else {
      currentColorArrangment[SquareBeingReplaceId] = squareBeingReplace.getAttribute("src")
      currentColorArrangment[SquareBeingDragId] = squareBeingDrag.getAttribute("src")
      setCurrentColorArrangment([...currentColorArrangment])
      console.log("hi")
    }

    console.log(validMovie)
  }
  return (
    <div className="app">
      <div className="game">

        {currentColorArrangment.map((candyColor, index) => (
          <div>
            <img
              key={index.toString()}
              alt={candyColor}
              data-id={index}
              src={candyColor}
              draggable={true}
              onDragStart={dragStart}
              onDragOver={(e) => e.preventDefault()}
              onDragEnter={(e) => e.preventDefault()}
              onDragLeave={(e) => e.preventDefault()}
              onDrop={dragDrop}
              onDragEnd={dragEnd}

            />
          </div>

        ))}
      </div>
    </div>
  );
}

export default App;
