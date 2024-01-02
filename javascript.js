async function bubbleSort(array){
    const n = array.length;
    for(let i =0;i<n-1;i++){
      for(let j=0;j<n-i-1;j++){
        await visualize(array, [j, j + 1]);
        if (array[j] > array[j + 1]) {
            [array[j], array[j + 1]] = [array[j + 1], array[j]];
            await visualize(array, [j, j + 1], true);
          }
      }
    }
   }

    async function selectionSort(array) {
      const n = array.length;

      for (let i = 0; i < n - 1; i++) {
        let minIndex = i;
        for (let j = i + 1; j < n; j++) {
          await visualize(array, [minIndex, j]);
          if (array[j] < array[minIndex]) {
            minIndex = j;
          }
        }

        [array[i], array[minIndex]] = [array[minIndex], array[i]];
        await visualize(array, [i, minIndex], true);
      }
    }

    async function mergeSort(array, start = 0, end = array.length - 1) {
      if (start < end) {
        const mid = Math.floor((start + end) / 2);
        await mergeSort(array, start, mid);
        await mergeSort(array, mid + 1, end);
        await merge(array, start, mid, end);
      }
    }

    async function merge(array, start, mid, end) {
      const left = array.slice(start, mid + 1);
      const right = array.slice(mid + 1, end + 1);
      let i = 0, j = 0, k = start;

      while (i < left.length && j < right.length) {
        await visualize(array, [start + i, mid + 1 + j]);
        if (left[i] <= right[j]) {
          array[k++] = left[i++];
        } else {
          array[k++] = right[j++];
        }
      }

      while (i < left.length) {
        array[k++] = left[i++];
      }
      while (j < right.length) {
        array[k++] = right[j++];
      }
      await visualize(array, [], true);
    }

    function displayTimeComplexity(algorithm) {
      const timeComplexityElement = document.getElementById('time-complexity');
      let timeComplexity;

      switch (algorithm) {
        case 'bubbleSort':
          timeComplexity = 'O(n^2)';
          break;
        case 'selectionSort':
          timeComplexity = 'O(n^2)';
          break;
        case 'mergeSort':
          timeComplexity = 'O(n log n)';
          break;
        default:
          timeComplexity = '';
          break;
      }

      timeComplexityElement.textContent = `Time Complexity: ${timeComplexity}`;
    }
    function displaySpaceComplexity(algorithm) {
      const scElement = document.getElementById('Space-complexity');
      let timeComplexity;
      switch (algorithm) {
        case 'bubbleSort':
          timeComplexity = 'O(1)';
          break;
        case 'selectionSort':
          timeComplexity = 'O(1)';
          break;
        case 'mergeSort':
          timeComplexity = 'O(n)';
          break;
        default:
          timeComplexity = '';
          break;
      }

      scElement.textContent = `Space Complexity: ${timeComplexity}`;
    }

    async function visualize(array, indices, isSwap = false) {
      const container = document.getElementById('container');
      container.innerHTML = '';

      array.forEach((value, index) => {
        const bar = document.createElement('div');
        bar.className = 'bar';
        bar.style.height = `${value * 5}px`;

        if (indices.includes(index)) {
          bar.style.backgroundColor = isSwap ? '#27ae60' : '#e74c3c';
        }

        container.appendChild(bar);
      });

      // Delay for visualization
      await new Promise(resolve => setTimeout(resolve, 50));
    }

    function startSorting(algorithm) {
      const arraySize = 20;
      const array = generateArray(arraySize);
      visualize(array, []);
      displayTimeComplexity(algorithm);
      displaySpaceComplexity(algorithm);

      switch (algorithm) {
        case 'bubbleSort':
          bubbleSort(array.slice());
          break;
        case 'selectionSort':
          selectionSort(array.slice());
          break;
        case 'mergeSort':
          mergeSort(array.slice());
          break;
        default:
          break;
      }
    }
    function generateArray(size) {
      const array = [];
      for (let i = 0; i < size; i++) {
        array.push(Math.floor(Math.random() * 50) + 1);
      }
      return array;
    }
  