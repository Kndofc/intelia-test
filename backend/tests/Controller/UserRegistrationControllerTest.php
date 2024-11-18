<?php

namespace App\Tests\Controller;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

class UserRegistrationControllerTest extends WebTestCase
{
    public function testCompleteUserRegistrationFlow(): void
    {
        $client = static::createClient();

        $client->request('POST', '/api/user/step1', [], [], ['CONTENT_TYPE' => 'application/json'], json_encode([
            'name' => 'João Silva',
            'birthdate' => '1990-01-01',
        ]));

        $this->assertResponseIsSuccessful();
        $this->assertResponseStatusCodeSame(201);

        $response = json_decode($client->getResponse()->getContent(), true);
        $this->assertArrayHasKey('status', $response);
        $this->assertEquals('Step 1 completed', $response['status']);
        $this->assertArrayHasKey('userId', $response);

        $userId = $response['userId'];

        $client->request('POST', "/api/user/step2/$userId", [], [], ['CONTENT_TYPE' => 'application/json'], json_encode([
            'street' => 'Rua Principal',
            'number' => 123,
            'zip_code' => '12345678',
            'city' => 'São Paulo',
            'state' => 'SP',
        ]));

        $this->assertResponseIsSuccessful();
        $this->assertResponseStatusCodeSame(200);

        $response = json_decode($client->getResponse()->getContent(), true);
        $this->assertArrayHasKey('status', $response);
        $this->assertEquals('Step 2 completed', $response['status']);

        $client->request('POST', "/api/user/step3/$userId", [], [], ['CONTENT_TYPE' => 'application/json'], json_encode([
            'phone' => '1123456789',
            'mobile' => '11987654321',
        ]));

        $this->assertResponseIsSuccessful();
        $this->assertResponseStatusCodeSame(200);

        $response = json_decode($client->getResponse()->getContent(), true);
        $this->assertArrayHasKey('status', $response);
        $this->assertEquals('Step 3 completed', $response['status']);

        $client->request('GET', "/api/user/$userId");

        $this->assertResponseIsSuccessful();
        $this->assertResponseStatusCodeSame(200);

        $response = json_decode($client->getResponse()->getContent(), true);
        $this->assertArrayHasKey('id', $response);
        $this->assertEquals($userId, $response['id']);
        $this->assertEquals('João Silva', $response['name']);
        $this->assertEquals('1990-01-01', $response['birthdate']);
        $this->assertEquals('Rua Principal', $response['street']);
        $this->assertEquals(123, $response['number']);
        $this->assertEquals('12345678', $response['zip_code']);
        $this->assertEquals('São Paulo', $response['city']);
        $this->assertEquals('SP', $response['state']);
        $this->assertEquals('1123456789', $response['phone']);
        $this->assertEquals('11987654321', $response['mobile']);
    }

    public function testStep1WithInvalidData(): void
    {
        $client = static::createClient();

        $client->request('POST', '/api/user/step1', [], [], ['CONTENT_TYPE' => 'application/json'], json_encode([
            'name' => '',
            'birthdate' => '',
        ]));

        $this->assertResponseStatusCodeSame(400);

        $response = json_decode($client->getResponse()->getContent(), true);
        $this->assertArrayHasKey('error', $response);
        $this->assertEquals('Name and birthdate are required', $response['error']);
    }
}
