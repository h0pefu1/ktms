using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Repositories.IRepositories;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace KTMSApi.Controllers
{

    [Route("api/heap")]
    public class HeapController : Controller
    {

        static void HeapSort<T>(T[] arr) where T : IComparable<T>
        {
            Heap<T> heap = new Heap<T>();

            foreach (T item in arr)
            {
                heap.Insert(item);
            }

            for (int i = arr.Length - 1; i >= 0; i--)
            {
                arr[i] = heap.Remove();
            }
        }


        [HttpGet("sort")]
        public async Task<ActionResult> SortArrayByHeap(int[] arrayOfIItems) 
        {
            HeapSort(arrayOfIItems);
            return Ok(arrayOfIItems);
        }
    }



}

public class Heap<T> where T : IComparable<T>
{
    private List<T> items;

    public Heap()
    {
        items = new List<T>();
    }

    public int Count
    {
        get { return items.Count; }
    }

    public void Insert(T item)
    {
        items.Add(item);
        int currentIndex = items.Count - 1;

        while (currentIndex > 0)
        {
            int parentIndex = (currentIndex - 1) / 2;

            if (items[currentIndex].CompareTo(items[parentIndex]) > 0)
            {
                T temp = items[currentIndex];
                items[currentIndex] = items[parentIndex];
                items[parentIndex] = temp;
                currentIndex = parentIndex;
            }
            else
            {
                break;
            }
        }
    }

    public T Peek()
    {
        if (items.Count > 0)
            return items[0];
        throw new InvalidOperationException("Heap is empty.");
    }

    public T Remove()
    {
        if (items.Count == 0)
            throw new InvalidOperationException("Heap is empty.");

        T root = items[0];
        items[0] = items[items.Count - 1];
        items.RemoveAt(items.Count - 1);

        int currentIndex = 0;
        while (true)
        {
            int leftChildIndex = 2 * currentIndex + 1;
            int rightChildIndex = 2 * currentIndex + 2;
            int largestIndex = currentIndex;

            if (leftChildIndex < items.Count && items[leftChildIndex].CompareTo(items[largestIndex]) > 0)
            {
                largestIndex = leftChildIndex;
            }

            if (rightChildIndex < items.Count && items[rightChildIndex].CompareTo(items[largestIndex]) > 0)
            {
                largestIndex = rightChildIndex;
            }

            if (largestIndex == currentIndex)
            {
                break;
            }

            T temp = items[currentIndex];
            items[currentIndex] = items[largestIndex];
            items[largestIndex] = temp;
            currentIndex = largestIndex;
        }

        return root;
    }
 
}


