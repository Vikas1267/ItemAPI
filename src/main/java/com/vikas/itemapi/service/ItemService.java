package com.vikas.itemapi.service;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.stereotype.Service;

import com.vikas.itemapi.model.Item;
import com.vikas.itemapi.model.ItemCreateRequest;
import com.vikas.itemapi.repository.InMemoryItemRepository;

@Service
public class ItemService {
    private final InMemoryItemRepository repository;

    public ItemService(InMemoryItemRepository repository) {
        this.repository = repository;
    }

    public Item createItem(ItemCreateRequest request) {
        Item item = new Item(
            null,
            request.getName(),
            request.getDescription(),
            request.getCategory(),
            defaultPrice(request.getPrice()),
            true
        );

        return repository.save(item);
    }

    public Item getItemById(long id) {
        return repository.findById(id).orElse(null);
    }

    public List<Item> getAllItems() {
        return repository.findAll();
    }

    private BigDecimal defaultPrice(BigDecimal price) {
        return price == null ? BigDecimal.ZERO : price;
    }
}
