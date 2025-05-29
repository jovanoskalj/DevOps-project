package mk.ukim.finki.fooddeliverybackend.service.application.impl;

import jakarta.transaction.Transactional;
import mk.ukim.finki.fooddeliverybackend.dto.domain.CreateDishDto;
import mk.ukim.finki.fooddeliverybackend.dto.domain.DisplayDishDetailsDto;
import mk.ukim.finki.fooddeliverybackend.dto.domain.DisplayDishDto;
import mk.ukim.finki.fooddeliverybackend.dto.domain.DisplayOrderDto;
import mk.ukim.finki.fooddeliverybackend.model.domain.Dish;
import mk.ukim.finki.fooddeliverybackend.model.domain.Order;
import mk.ukim.finki.fooddeliverybackend.model.domain.Restaurant;
import mk.ukim.finki.fooddeliverybackend.model.exceptions.DishNotFoundException;
import mk.ukim.finki.fooddeliverybackend.model.exceptions.RestaurantNotFoundException;
import mk.ukim.finki.fooddeliverybackend.service.application.DishApplicationService;
import mk.ukim.finki.fooddeliverybackend.service.domain.DishService;
import mk.ukim.finki.fooddeliverybackend.service.domain.OrderService;
import mk.ukim.finki.fooddeliverybackend.service.domain.RestaurantService;
import mk.ukim.finki.fooddeliverybackend.service.domain.UserService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DishApplicationServiceImpl implements DishApplicationService {

    private final DishService dishService;
    private final RestaurantService restaurantService;
    private final OrderService orderService;
    private final UserService userService;

    public DishApplicationServiceImpl(DishService dishService, RestaurantService restaurantService, OrderService orderService, UserService userService) {
        this.dishService = dishService;
        this.restaurantService = restaurantService;
        this.orderService = orderService;
        this.userService = userService;
    }

    @Override
    public List<DisplayDishDto> findAll() {
        // TODO: Implement this.
//        productService.findAll().stream().map(DisplayProductDto::from).toList();
        return dishService.findAll().stream().map(DisplayDishDto::from).toList();
    }

    @Override
    public Optional<DisplayDishDto> findById(Long id) {
        return dishService
                .findById(id)
                .map(DisplayDishDto::from);
    }

    @Override
    public Optional<DisplayDishDetailsDto> findByIdWithDetails(Long id) {
        // TODO: Implement this.
        return  dishService
                .findById(id)
                .map(DisplayDishDetailsDto::from);
    }

    @Override
    public DisplayDishDto save(CreateDishDto createDishDto) {
        // TODO: Implement this.
        Restaurant restaurant = restaurantService.findById(createDishDto.restaurantId())
                .orElseThrow(()->new RestaurantNotFoundException(createDishDto.restaurantId()));

        return DisplayDishDto.from(dishService.save(createDishDto.toDish(restaurant)));
    }

    @Override
    public Optional<DisplayDishDto> update(Long id, CreateDishDto createDishDto) {
        Restaurant restaurant = restaurantService.findById(createDishDto.restaurantId())
                .orElseThrow(()->new RestaurantNotFoundException(createDishDto.restaurantId()));
        return dishService.update(id, createDishDto.toDish(restaurant)).map(
                DisplayDishDto::from
        );
    }

    @Override
    public Optional<DisplayDishDto> deleteById(Long id) {

        return dishService.deleteById(id).map(DisplayDishDto::from);
    }

    @Override
    @Transactional
    public DisplayOrderDto addToOrder(Long id, String username) {
       Dish dish = dishService.findById(id)
               .orElseThrow(()->new DishNotFoundException(id));
       Order order = orderService.findOrCreatePending(username);
       return DisplayOrderDto.from(dishService.addToOrder(dish,order));

    }

    @Override
    @Transactional
    public DisplayOrderDto removeFromOrder(Long id, String username) {
        Dish dish = dishService.findById(id)
                .orElseThrow(()->new DishNotFoundException(id));
        Order order = orderService.findOrCreatePending(username);
        return DisplayOrderDto.from(dishService.removeFromOrder(dish,order));
    }

}
