import { useState } from 'react';

export function useDragAndDrop(onItemDrop) {
    const [isDragOver, setIsDragOver] = useState(false);

    const handleDragOver = (event) => {
        event.preventDefault();
        setIsDragOver(true);
        event.currentTarget.classList.add('drag-over');
    };

    const handleDragLeave = (event) => {
        setIsDragOver(false);
        event.currentTarget.classList.remove('drag-over');
    };

    const handleDrop = (event) => {
        event.preventDefault();
        setIsDragOver(false);
        event.currentTarget.classList.remove('drag-over');

        try {
            const productData = JSON.parse(event.dataTransfer.getData('application/json'));
            console.log('Dropped product data:', productData);
            onItemDrop(productData);
        } catch (error) {
            console.error('Error dropping item:', error);
        }
    };

    return {
        isDragOver,
        handleDragOver,
        handleDragLeave,
        handleDrop
    };
}
