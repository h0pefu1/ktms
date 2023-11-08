using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace KTMSApi.Controllers
{
    [Route("api/heap")]
    public class HeapController : Controller
    {
        [HttpGet("sort")]
        public async Task<ActionResult> SortArrayByHeap(int[] arrayOfItems)
        {
            Heap<int> heap = new Heap<int>();
            int[] sortedArray = heap.HeapSort(arrayOfItems);
            return Ok(sortedArray);
        }

        [HttpGet("sort-within-k")]
        public async Task<ActionResult> SortArrayWithinK(int[] arrayOfItems, int k)
        {
            SortWithinK(arrayOfItems, k);
            return Ok(arrayOfItems);
        }

        static void SortWithinK<T>(T[] arr, int k) where T : IComparable<T>
        {
            Heap<T> minHeap = new Heap<T>();

            for (int i = 0; i <= k && i < arr.Length; i++)
            {
                minHeap.Insert(arr[i]);
            }

            int targetIndex = 0;

            for (int i = k + 1; i < arr.Length; i++)
            {
                arr[targetIndex++] = minHeap.Remove();
                minHeap.Insert(arr[i]);
            }

            while (!minHeap.IsEmpty())
            {
                arr[targetIndex++] = minHeap.Remove();
            }
        }
    }

    public class Heap<T> where T : IComparable<T>
    {
        public int Count { get; private set; }

        public int[] HeapSort(int[] arr)
        {
            BuildMaxHeap(arr);
            int n = arr.Length;

            for (int i = n - 1; i >= 0; i--)
            {
                int temp = arr[0];
                arr[0] = arr[i];
                arr[i] = temp;

                MaxHeapify(arr, i, 0);
            }

            return arr;
        }

        internal void Insert<T>(T t) where T : IComparable<T>
        {
            throw new NotImplementedException();
        }

        internal T Remove()
        {
            throw new NotImplementedException();
        }

        private void BuildMaxHeap(int[] arr)
        {
            int n = arr.Length;
            for (int i = n / 2 - 1; i >= 0; i--)
            {
                MaxHeapify(arr, n, i);
            }
        }

        public bool IsEmpty()
        {
            return Count == 0;
        }

        private void MaxHeapify(int[] arr, int n, int i)
        {
            int largest = i;
            int left = 2 * i + 1;
            int right = 2 * i + 2;

            if (left < n && arr[left] > arr[largest])
            {
                largest = left;
            }

            if (right < n && arr[right] > arr[largest])
            {
                largest = right;
            }

            if (largest != i)
            {
                int swap = arr[i];
                arr[i] = arr[largest];
                arr[largest] = swap;

                MaxHeapify(arr, n, largest);
            }
        }
    }
}