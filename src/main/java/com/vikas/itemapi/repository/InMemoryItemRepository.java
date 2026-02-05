package com.vikas.itemapi.repository;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicLong;

import org.springframework.stereotype.Repository;

import com.vikas.itemapi.model.Item;

@Repository
public class InMemoryItemRepository {
    private final List<Item> items = new ArrayList<>();
    private final AtomicLong idGenerator = new AtomicLong(0);

    public synchronized Item save(Item item) {
        item.setId(idGenerator.incrementAndGet());
        items.add(item);
        return item;
    }

    public synchronized Optional<Item> findById(long id) {
        return items.stream().filter(item -> item.getId() != null && item.getId() == id).findFirst();
    }

    public synchronized List<Item> findAll() {
        return Collections.unmodifiableList(new ArrayList<>(items));
    }
}
